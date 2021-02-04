import { parse } from 'dotenv/types';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT as string),
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

function makeANiceEmail (text: string): string {
    return `
        <div style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px;"
        >
            <h2>Hello there!</h2>
            <p>${text}</p>
            <p>^_^</p>
        </div>
    `
}

export async function sendPasswordResetEmail (resetToken: string, to: string) {
    const info = await transporter.sendMail({
        to,
        from: 'test@example.com',
        subject: 'your password reset token',
        html: makeANiceEmail(`Your Password Reset Token is here: 
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here!</a>
        `)
    })

    console.log(info)
}