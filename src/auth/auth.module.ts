import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { BusinessGuard } from './guards/business.guard';
import { initializeFirebaseAdmin } from '../config/firebase.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PassportModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    FirebaseAuthStrategy,
    FirebaseAuthGuard,
    RolesGuard,
    BusinessGuard,
  ],
  exports: [AuthService, FirebaseAuthGuard, RolesGuard, BusinessGuard],
})
export class AuthModule {
  onModuleInit() {
    // Inicializa o Firebase Admin SDK quando o módulo for carregado
    initializeFirebaseAdmin();
  }
}
