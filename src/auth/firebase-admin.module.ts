import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { initializeFirebaseAdmin } from 'src/config/firebase.config';

@Module({
  providers: [FirebaseAdminService],
  exports: [FirebaseAdminService],
})
export class FirebaseAdminModule {
  onModuleInit() {
    // Inicializa o Firebase Admin SDK quando o módulo for carregado
    initializeFirebaseAdmin();
  }
}
