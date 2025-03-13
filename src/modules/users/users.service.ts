import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FirebaseAdminService } from '../../auth/firebase-admin.service';
import * as crypto from 'crypto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private firebaseAdmin: FirebaseAdminService,
  ) {}

  private generateRandomPassword(): string {
    // Generate a random password with at least one uppercase, one lowercase, one number, and one special character
    const length = 12;
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';

    // Ensure at least one of each required character type
    password += 'A'; // uppercase
    password += 'a'; // lowercase
    password += '1'; // number
    password += '!'; // special character

    // Fill the rest with random characters
    for (let i = password.length; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length);
      password += charset[randomIndex];
    }

    // Shuffle the password
    return password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }

  async createUser(createUserDto: CreateUserDto) {
    const password = this.generateRandomPassword();

    if (createUserDto.businessId) {
      const business = await this.prisma.business.findUnique({
        where: {
          id: createUserDto.businessId,
        },
      });

      if (!business) {
        throw new UnprocessableEntityException('Business not found');
      }
    }

    // Create user in Firebase
    const firebaseUser = await this.firebaseAdmin.auth().createUser({
      email: createUserDto.email,
      password: password,
      displayName: createUserDto.name,
    });

    // Create user in database
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        role: createUserDto.role,
        firebaseAuthId: firebaseUser.uid,
        businessId: createUserDto.businessId,
      },
    });

    // Return user data and temporary password
    return {
      user,
      temporaryPassword: password,
    };
  }

  async findAll(businessId?: number): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: businessId ? { businessId } : undefined,
      include: { business: true },
    });

    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { business: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByFirebaseId(firebaseId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        firebaseAuthId: firebaseId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with Firebase ID ${firebaseId} not found`,
      );
    }

    return user;
  }
}
