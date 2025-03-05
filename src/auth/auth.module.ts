import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { initializeFirebaseAdmin } from '../config/firebase.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthStrategy, FirebaseAuthGuard],
  exports: [AuthService, FirebaseAuthGuard],
})
export class AuthModule {
  onModuleInit() {
    // Inicializa o Firebase Admin SDK quando o módulo for carregado
    initializeFirebaseAdmin();
  }
}
