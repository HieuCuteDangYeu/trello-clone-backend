import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../../../config';

export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  public async sendVerificationEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const link = `${config.frontendURL}/verify-email?token=${token}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to Trello Clone!</h2>
        <p>Please click the button below to verify your email address:</p>
        <a href="${link}" style="
          background-color: #0079bf; 
          color: white; 
          padding: 10px 20px; 
          text-decoration: none; 
          border-radius: 5px;
          display: inline-block;
          margin-top: 10px;">
          Verify Email
        </a>
        <p style="margin-top: 20px; color: #888;">Or copy this link: <br>${link}</p>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: config.smtp.from,
        to: email,
        subject: 'Verify your email address',
        html: htmlContent,
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  public async sendPasswordResetEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const link = `${config.frontendURL}/reset-password?token=${token}`;

    try {
      await this.transporter.sendMail({
        from: config.smtp.from,
        to: email,
        subject: 'Reset your password',
        html: `
        <p>You requested a password reset</p>
        <a href="${link}" style="
          background-color: #0079bf; 
          color: white; 
          padding: 10px 20px; 
          text-decoration: none; 
          border-radius: 5px;
          display: inline-block;
          margin-top: 10px;">
          Click here to reset your password
        </a>
        <p>This link expires in 1 hour.</p>
      `,
      });
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}
