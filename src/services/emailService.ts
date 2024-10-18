// mailer.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com', // Brevo SMTP host
  port: 587, // Use 587 for TLS
  auth: {
    user: '7df466001@smtp-brevo.com', // Your Brevo SMTP username (API key)
    pass: 'JpUbzIxnvFXSaLDw' // Your Brevo API key (same as username)
  },
  secure: false, // Use TLS
});

export const sendMail = async (userEmail: string, subject: string, html: string) => {
  // console.log({
  //   from : process.env.BREVO_USERNAME,
  //   sendignTo:to,
  //   apiKey:process.env.BREVO_API_KEY,
  //   userName : process.env.BREVO_USERNAME,
  // })

  const mailerOptions = {
    from: '"Wok9ja" <hello@floatsolutionhub.com>', // sender address
    to: userEmail, // Recipient's email address
    subject: subject,
    html: html,
  };

  return transporter.sendMail(mailerOptions);
};