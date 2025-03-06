import { User, UserRoles } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto implements Partial<User> {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The role assigned to the user',
    enum: UserRoles,
    example: Object.values(UserRoles)[0],
  })
  role: UserRoles;

  @ApiProperty({
    description: 'The ID of the business the user belongs to',
    required: false,
    example: 1,
  })
  businessId?: number;

  @ApiProperty({
    description: 'The Firebase authentication ID of the user',
    example: 'firebase_auth_id_123',
  })
  firebaseAuthId: string;

  @ApiProperty({
    description: 'The timestamp when the user was created',
    example: '2024-03-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the user was last updated',
    example: '2024-03-15T10:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The timestamp when the user was deleted (if applicable)',
    required: false,
    example: null,
  })
  deletedAt?: Date;
}
