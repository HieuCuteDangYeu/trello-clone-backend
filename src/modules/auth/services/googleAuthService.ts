import { OAuth2Client } from 'google-auth-library';
import { config } from '../../../config';

interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
}

export class GoogleAuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(config.google.clientId);
  }

  public async verifyIdToken(token: string): Promise<GoogleUser> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: config.google.clientId,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email || !payload.name) {
        throw new Error('Invalid Google Token Payload');
      }

      return {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      };
    } catch (error: unknown) {
      console.error('Google Verification Failed:', error);
      throw new Error('Invalid Google Token');
    }
  }
}
