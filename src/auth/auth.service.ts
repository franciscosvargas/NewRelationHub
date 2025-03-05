import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';
import { UnauthorizedException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor() {}

  async loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<string> {
    try {
      // Get the user by email
      const userRecord = await auth().getUserByEmail(email);

      // Create a custom token for the user
      const customToken = await auth().createCustomToken(userRecord.uid);

      // Exchange custom token for ID token using axios
      const { data } = await axios.post<{ idToken: string }>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`,
        {
          token: customToken,
          returnSecureToken: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return data.idToken;
    } catch (error) {
      console.log(error.response?.data || error.message);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
