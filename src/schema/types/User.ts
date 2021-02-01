import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { objectType, enumType, queryType, extendType, stringArg, nonNull, nullable } from "nexus";
import { Context } from "src/context";
import { SuccessMessage } from './common';

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
        t.model.password()
        t.model.resetToken()
        t.model.resetTokenExpiry()
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

                const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as string);
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
                })
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

                const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as string);
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
                })
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
    }
})