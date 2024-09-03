import { NextRequest, NextResponse } from 'next/server';
const nodemailer = require('nodemailer');

export async function POST(req: NextRequest, res:NextResponse){
    const formData = await req.formData();

    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey', // SendGrid requires 'apikey' as the username
        pass: process.env.SENDGRID_API_KEY, // Your SendGrid API key
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.AUTHORIZED_USER,
        to: process.env.AUTHORIZED_USER,
        subject: `DEV-PORTFOLIO: from ${email}`,
        text: `from ${name} at ${email}:\n\n ${message}`,
      });

      return NextResponse.json({ success: true }, {status:200});
    } 
    catch(e){
        return NextResponse.json({ status: "fail", error: e }, {status: 500});
    }
}