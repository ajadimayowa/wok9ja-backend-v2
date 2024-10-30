// mailer.ts
import nodemailer from 'nodemailer';



export const sendMail = async (userEmail: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST, // Brevo SMTP host
    port: parseInt(process.env.BREVO_HOST_PORT || '587'), // Use 587 for TLS
    
    auth: {
      user: process.env.BREVO_USERNAME, // Your Brevo SMTP username (API key)
      pass: process.env.BREVO_PASSWORD // Your Brevo API key (same as username)
    },
    secure: true, // Use TLS
  });


  const mailerOptions = {
    from: '"Wok9ja" <hello@floatsolutionhub.com>', // sender address
    to: userEmail, // Recipient's email address
    subject: subject,
    html: html,
  };

  return transporter.sendMail(mailerOptions);
};