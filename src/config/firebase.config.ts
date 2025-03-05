import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

/**
 * Inicializa o Firebase Admin SDK
 * Você precisará de um arquivo de credenciais do Firebase (serviceAccountKey.json)
 * ou configurar as variáveis de ambiente correspondentes
 */
export function initializeFirebaseAdmin(): void {
  // Verifica se o Firebase já foi inicializado
  if (admin.apps.length === 0) {
    try {
      // Opção 1: Usando arquivo de credenciais
      // const serviceAccount = require('../path/to/serviceAccountKey.json');

      // Opção 2: Usando variáveis de ambiente (recomendado para produção)
      // As variáveis de ambiente podem ser configuradas no seu servidor
      const serviceAccount: ServiceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Você pode adicionar outras configurações aqui, como databaseURL
        // databaseURL: process.env.FIREBASE_DATABASE_URL,
      });

      console.log('Firebase Admin SDK inicializado com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar Firebase Admin SDK:', error);
      throw error;
    }
  }
}

// Exporta a instância do admin para uso em outros módulos
export { admin };
