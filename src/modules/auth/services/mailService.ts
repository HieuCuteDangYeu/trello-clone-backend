import { google } from 'googleapis';
import { config } from '../../../config';

export class MailService {
  private oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      config.google.clientId,
      config.google.clientSecret,
      'https://developers.google.com/oauthplayground',
    );

    this.oauth2Client.setCredentials({
      refresh_token: config.google.refreshToken,
    });
  }

  private async sendMail(to: string, subject: string, html: string) {
    try {
      const accessToken = await this.oauth2Client.getAccessToken();
      if (!accessToken.token)
        throw new Error('Failed to generate access token');

      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });

      const messageParts = [
        `From: ${config.google.user}`,
        `To: ${to}`,
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        `Subject: ${subject}`,
        '',
        html,
      ];

      const message = messageParts.join('\n');

      const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async sendVerificationEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const link = `${config.frontendURL}/verify-email?token=${token}`;
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Welcome!</h2>
        <p>Please click the link below to verify your email:</p>
        <a href="${link}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
      </div>
    `;
    await this.sendMail(email, 'Verify your email', html);
  }

  public async sendPasswordResetEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const link = `${config.frontendURL}/reset-password?token=${token}`;
    const html = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${link}">Reset Password</a>
      </div>
    `;
    await this.sendMail(email, 'Reset your password', html);
  }
}
