import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { Public } from './decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

interface RequestWithUser extends Request {
  user: Record<string, unknown>;
}

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Rota pública que não requer autenticação' })
  public getPublicRoute() {
    return { message: 'Esta é uma rota pública' };
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtém o perfil do usuário autenticado' })
  getProfile(@Request() req: RequestWithUser): Record<string, unknown> {
    // O req.user contém as informações do usuário autenticado
    // que foram retornadas pelo método validate() da estratégia
    return req.user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const idToken = await this.authService.loginWithEmailAndPassword(
      loginDto.email,
      loginDto.password,
    );

    return { idToken };
  }
}
