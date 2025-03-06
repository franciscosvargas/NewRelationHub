import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoles } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The role assigned to the user',
    enum: UserRoles,
    example: Object.values(UserRoles)[0],
  })
  @IsEnum(UserRoles)
  @IsNotEmpty()
  role: UserRoles;

  @ApiProperty({
    description: 'The ID of the business the user belongs to',
    required: false,
    example: 1,
  })
  @IsOptional()
  businessId?: number;
}
