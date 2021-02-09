import bcrypt from 'bcryptjs'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import { objectType, enumType, extendType, stringArg, nonNull, list, intArg } from "nexus";
import { Context } from "src/context";
import { SuccessMessage } from './common';
import { sendPasswordResetEmail } from '../../lib/email'
import { CartItem } from './CartItem'
import { Role, User as UserType } from '@prisma/client'

export type UserWithRole = UserType & { role: Role } 
export interface EncodedUserRole {
    name: string,
    permissions: {
        canManageCart: boolean
        canManageOrders: boolean
        canManageProducts: boolean
        canManageRoles: boolean
        canManageUsers: boolean
        canSeeOtherUsers: boolean,
    }
}

function setToken (user: UserWithRole, res: Response) {
    const userDataToEncode: EncodedUserRole = {
        name: user.role.name,
        permissions: {
            canManageCart: user.role.canManageCart,
            canManageOrders: user.role.canManageOrders,
            canManageProducts: user.role.canManageProducts,
            canManageRoles: user.role.canManageRoles,
            canManageUsers: user.role.canManageUsers,
            canSeeOtherUsers: user.role.canSeeOtherUsers
        }
    }

    const token = jwt.sign({ role: userDataToEncode, userId: user.id }, process.env.APP_SECRET as string);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    })
}

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.email()
        t.model.name()
        t.model.cart()
        t.model.orders()
        t.model.role()
    }
})

export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
        t.crud.user()

        t.field('me', {
            type: User,
            async resolve(_root, _args, ctx: Context) {
                const { prisma, req, res } = ctx
                const { userId } = req
                if (!userId) {
                    return null
                }
                const user = await prisma.user.findUnique({
                    where: {
                        id: userId
                    }
                })
                return user
            }
        })

        t.field('getMyCart', {
            type: list(CartItem),
            async resolve(_root, _args, ctx: Context) {
                const { prisma, req } = ctx
                const { userId } = req

                if (!userId) {
                    return null
                }

                const result = await prisma.user.findUnique({
                    where: {
                        id: userId
                    },
                    select: {
                        cart: {
                            include: {
                                item: true
                            }
                        }
                    }
                })

                if (result === null) {
                    return null
                } else {
                    return result.cart
                }
            }
        })
    }
})

export const UserMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('signup', {
            type: User,
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                name: nonNull(stringArg())
            },
            async resolve(_root, args, ctx: Context) {
                const { prisma, req, res } = ctx
                const { email, password, name } = args

                const lowercasedEmail: string = email.toLowerCase()
                const hashedPassword = await bcrypt.hash(password, 10)

                const user = await prisma.user.create({
                    data: {
                        email: lowercasedEmail,
                        password: hashedPassword,
                        name,
                        role: {
                            /* Default user role */
                            connect: {
                                id: 2
                            }
                        }
                    },
                    include: {
                        role: true
                    }
                })

                setToken(user, res)

                return user
            }
        })

        t.field('signin', {
            type: User,
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            async resolve (_root, args, ctx: Context) {
                const { prisma, res } = ctx
                const { email, password } = args
                const lowercasedEmail = email.toLowerCase()

                const user = await prisma.user.findFirst({
                    where: {
                        email: lowercasedEmail,
                    },
                    include: {
                        role: true
                    }
                })

                if (user === null) {
                    throw new Error(`No such user found for email ${lowercasedEmail}`)
                }

                const valid = await bcrypt.compare(password, user.password)

                if (!valid) {
                    throw new Error('Invalid password')
                }

                setToken(user, res)

                return user
            }
        })

        t.field('signout', {
            type: SuccessMessage,
            async resolve (_root, _args, ctx: Context) {
                ctx.res.clearCookie('token')
                return { message: 'Goodbye!' }
            }
        })

        t.field('requestPasswordReset', {
            type: SuccessMessage,
            args: {
                email: nonNull(stringArg())
            },
            async resolve (_root, args, ctx: Context) {
                const { email } = args
                const user = await ctx.prisma.user.findFirst({
                    where: {
                        email: email.toLowerCase()
                    },
                    include: {
                        role: true
                    }
                })

                if (user === null) {
                    throw new Error(`No such user found for email ${email}`)
                }
                const randomBytesPromise = promisify(randomBytes)
                const resetToken = (await randomBytesPromise(20)).toString('hex')
                const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now
                await ctx.prisma.user.update({
                    where: {
                        email: email.toLowerCase()
                    },
                    data: {
                        resetToken,
                        resetTokenExpiry
                    }
                })

                await sendPasswordResetEmail(resetToken, email)

                return {
                    message: 'Success'
                }
            }
        })

        t.field('resetPassword', {
            type: User,
            args: {
                resetToken: nonNull(stringArg()),
                password: nonNull(stringArg()),
                confirmPassword: nonNull(stringArg())
            },

            async resolve (_root, args, ctx: Context) {
                const { resetToken, password, confirmPassword } = args
                const { prisma, res } = ctx

                if (password !== confirmPassword) {
                    throw new Error('Passwords don\'t match')
                }

                const user = await prisma.user.findFirst({
                    where: {
                        resetToken,
                        resetTokenExpiry: {
                            gt: Date.now() - 3600000
                        },
                    },
                    include: {
                        role: true
                    }
                })

                if (user === null) {
                    throw new Error('Reset token is invalid or expired')
                }

                const newPassword = await bcrypt.hash(password, 10)
                const newUser = await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        password: newPassword,
                        resetToken: null,
                        resetTokenExpiry: null
                    }
                })
                setToken(user, res)

                return newUser
            }
        })
    }
})