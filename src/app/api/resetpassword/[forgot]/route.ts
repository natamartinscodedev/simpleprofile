import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // if (req.method !== 'POST') return res.status(405).end()
  if (req.method === 'POST') {
    const body = await req.json()
    const { email } = body

    try {
      if (email) {
        const transporter = nodemailer.createTransport({
          host: 'sandbox.smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
          }
        })

        const resetUrl = `${process.env.NEXTAUTH_URL}/ResetPassword`

        const mailOptions = {
          from: '"SimpleProfile" <noreply@simpleprofile.com>',
          to: email,
          subject: 'Redefinição de Senha',
          html: `<p>Para redefinir sua senha, clique no link abaixo:</p>
                 <a href="${resetUrl}" >${resetUrl}</a>`
        }

        await transporter.sendMail(mailOptions)
        7
        return NextResponse.json(
          { message: 'Email enviado!', success: true },
          { status: 200 }
        )
      }
    } catch (err: any) {
      console.error(err)
      return NextResponse.json(
        { message: 'Error updating user', error: err.message },
        { status: 500 }
      )
    }
  }
}
