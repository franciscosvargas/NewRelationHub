import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { User, UserRoles } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: UserResponseDto,
    content: {
      'application/json': {
        example: {
          id: 1,
          email: 'user@example.com',
          name: 'John Doe',
          role: Object.values(UserRoles)[0],
          businessId: 1,
          firebaseAuthId: 'firebase_auth_id_123',
          createdAt: '2024-03-15T10:30:00.000Z',
          updatedAt: '2024-03-15T10:30:00.000Z',
          deletedAt: null,
        },
      },
    },
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users',
    type: [UserResponseDto],
    content: {
      'application/json': {
        example: [
          {
            id: 1,
            email: 'user1@example.com',
            name: 'John Doe',
            role: Object.values(UserRoles)[0],
            businessId: 1,
            firebaseAuthId: 'firebase_auth_id_123',
            createdAt: '2024-03-15T10:30:00.000Z',
            updatedAt: '2024-03-15T10:30:00.000Z',
            deletedAt: null,
          },
          {
            id: 2,
            email: 'user2@example.com',
            name: 'Jane Smith',
            role: Object.values(UserRoles)[0],
            businessId: 1,
            firebaseAuthId: 'firebase_auth_id_456',
            createdAt: '2024-03-15T11:30:00.000Z',
            updatedAt: '2024-03-15T11:30:00.000Z',
            deletedAt: null,
          },
        ],
      },
    },
  })
  async findAll(@Query('businessId') businessId?: number): Promise<User[]> {
    return this.usersService.findAll(businessId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns a user by id',
    type: UserResponseDto,
    content: {
      'application/json': {
        example: {
          id: 1,
          email: 'user@example.com',
          name: 'John Doe',
          role: Object.values(UserRoles)[0],
          businessId: 1,
          firebaseAuthId: 'firebase_auth_id_123',
          createdAt: '2024-03-15T10:30:00.000Z',
          updatedAt: '2024-03-15T10:30:00.000Z',
          deletedAt: null,
        },
      },
    },
  })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }
}
