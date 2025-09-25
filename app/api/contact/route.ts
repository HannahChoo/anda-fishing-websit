import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, wishlist } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create transporter based on environment variables
    let transporter

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Use custom SMTP settings
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      // Use Gmail
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
        },
      })
    } else {
      return NextResponse.json(
        { error: 'Email service not configured. Please contact administrator.' },
        { status: 500 }
      )
    }

    // Email content for company
    const companyEmailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .content { background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #495057; }
        .value { margin-top: 5px; }
        .message-box { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission - ANDA Fishing</h2>
            <p>You have received a new message through your website contact form.</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
            </div>
            
            <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
            </div>
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
            
            ${wishlist && wishlist.length > 0 ? `
            <div class="field">
                <div class="label">Wishlist Items:</div>
                <div class="message-box">
                    <ul style="margin: 0; padding-left: 20px;">
                        ${wishlist.map((item: any) => `
                            <li style="margin-bottom: 10px;">
                                <strong>${item.name}</strong><br>
                                <em>${item.description}</em>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            ` : ''}
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #dee2e6;">
            
            <p><strong>Reply to this customer:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><em>This message was sent from the ANDA sports. website contact form.</em></p>
        </div>
    </div>
</body>
</html>
    `

    // Email content for customer (auto-reply)
    const customerEmailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #007bff; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .content { background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; }
        .footer { margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; font-size: 14px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Thank You for Contacting ANDA Fishing</h2>
        </div>
        
        <div class="content">
            <p>Dear ${name},</p>
            
            <p>Thank you for reaching out to us! We have received your message and will get back to you as soon as possible.</p>
            
            <p><strong>Your message summary:</strong></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
            
            <p>Our typical response time is within 24-48 hours during business days. If your inquiry is urgent, please feel free to call us directly.</p>
            
            <p>Best regards,<br>
            ANDA Fishing Team</p>
        </div>
        
        <div class="footer">
            <p><strong>ANDA Fishing Contact Information:</strong></p>
            <p>📍 Address: NO.3-1, Minjiang Street, Weihai, #264203, Shandong, China</p>
            <p>📞 Phone: +86-18663108236</p>
            <p>📞 Tel: +86-0631-5758228/5757585</p>
            <p>📧 Sales: sales@andalure.com</p>
            <p>📧 General: truman@andalure.com</p>
            <p>🌐 Website: www.andalure.com</p>
        </div>
    </div>
</body>
</html>
    `

    // Send email to company (multiple recipients)
    const companyEmails = process.env.COMPANY_EMAIL || 'sales@andalure.com,truman@andalure.com,1993536430@qq.com'
    const companyMailOptions = {
      from: process.env.SMTP_FROM || process.env.GMAIL_USER,
      to: companyEmails,
      subject: `New Contact Form Submission: ${subject}`,
      html: companyEmailContent,
      replyTo: email,
    }

    // Send auto-reply to customer
    const customerMailOptions = {
      from: process.env.SMTP_FROM || process.env.GMAIL_USER,
      to: email,
      subject: 'Thank you for contacting ANDA Fishing',
      html: customerEmailContent,
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(customerMailOptions)
    ])

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}