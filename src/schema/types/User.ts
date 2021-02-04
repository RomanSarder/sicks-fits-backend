import bcrypt from 'bcryptjs'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import { objectType, enumType, extendType, stringArg, nonNull } from "nexus";
import { Context } from "src/context";
import { SuccessMessage } from './common';
import { sendPasswordResetEmail } from '../../lib/email'

function setToken (userId: number, res: Response) {
    const token = jwt.sign({ userId }, process.env.APP_SECRET as string);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    })
}

export const PermissionEnum = enumType({
    name: 'Permission',
    members: [
        'ADMIN',
        'USER',
        'ITEMCREATE',
        'ITEMDELETE',
        'ITEMUPDATE',
        'PERMISSIONUPDATE'
    ],
})

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.email()
        t.model.name()
        t.model.permissions()
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
                        permissions: ['USER']
                    }
                })

                setToken(user.id, res)

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
                    }
                })

                if (user === null) {
                    throw new Error(`No such user found for email ${lowercasedEmail}`)
                }

                const valid = await bcrypt.compare(password, user.password)

                if (!valid) {
                    throw new Error('Invalid password')
                }

                setToken(user.id, res)

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
                setToken(user.id, res)

                return newUser
            }
        })
    }
})