// welcomeEmail.ts
import { sendMail } from './emailService';
import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

export const sendWelcomeEmail = async (fullName: string,userEmail: string, verificationCode:string) => {
  const templatePath = path.join(__dirname, 'emailTemps', 'verification.hbs');
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  // Compile the Handlebars templates
  const template = handlebars.compile(templateSource);
  const html = template({ fullName,verificationCode });
  const subject = 'Welcome on board!'

  try {
    await sendMail(userEmail, subject, html);
    console.log('Welcome email sent successfully!');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const sendProfileUpdateEmail = async (fullName: string,userEmail: string, verificationCode:string) => {
  const templatePath = path.join(__dirname, 'emailTemps', 'verification.hbs');
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  // Compile the Handlebars templates
  const template = handlebars.compile(templateSource);
  const html = template({ fullName,verificationCode });
  const subject = 'Profile updated!'

  try {
    await sendMail(userEmail, subject, html);
    console.log('Welcome email sent successfully!');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const sendPasswordResetEmail = async (fullName: string,userEmail: string, verificationCode:string) => {
  const templatePath = path.join(__dirname, 'emailTemps', 'verification.hbs');
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  // Compile the Handlebars templates
  const template = handlebars.compile(templateSource);
  const html = template({ fullName,verificationCode });
  const subject = 'Request to change password!'

  try {
    await sendMail(userEmail, subject, html);
    console.log('Welcome email sent successfully!');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const sendPasswordChangedEmail = async (fullName: string,userEmail: string, verificationCode:string) => {
  const templatePath = path.join(__dirname, 'emailTemps', 'verification.hbs');
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  // Compile the Handlebars templates
  const template = handlebars.compile(templateSource);
  const html = template({ fullName,verificationCode });
  const subject = 'Password Changed!'

  try {
    await sendMail(userEmail, subject, html);
    console.log('Welcome email sent successfully!');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};


export const sendLoginNotificationEmail = async (fullName: string,userEmail: string, verificationCode:string) => {
  const templatePath = path.join(__dirname, 'emailTemps', 'verification.hbs');
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  // Compile the Handlebars templates
  const template = handlebars.compile(templateSource);
  const html = template({ fullName,verificationCode });
  const subject = 'Login notification!'

  try {
    await sendMail(userEmail, subject, html);
    // console.log('Welcome email sent successfully!');
  } catch (error) {
    console.error('Error sending login email:', error);
  }
};

export const sendUserVerifiedEmail = async (fullName: string,userEmail: string, verificationCode:string) => {
  const templatePath = path.join(__dirname, 'emailTemps', 'verification.hbs');
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  // Compile the Handlebars templates
  const template = handlebars.compile(templateSource);
  const html = template({ fullName,verificationCode });
  const subject = 'You have been verified!'

  try {
    await sendMail(userEmail, subject, html);
    // console.log('Welcome email sent successfully!');
  } catch (error) {
    console.error('Error sending login email:', error);
  }
};



// Example usage

