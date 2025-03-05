# Middleware de Autenticação com Firebase

Este módulo implementa um middleware de autenticação baseado no Firebase Authentication para o NestJS.

## Configuração

1. Adicione as variáveis de ambiente necessárias no seu arquivo `.env`:

```
FIREBASE_PROJECT_ID=seu-projeto-id
FIREBASE_CLIENT_EMAIL=seu-client-email@example.com
FIREBASE_PRIVATE_KEY="sua-chave-privada"
```

Ou, alternativamente, você pode usar um arquivo de credenciais do Firebase (serviceAccountKey.json).

2. Importe o `AuthModule` no seu `AppModule`:

```typescript
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ... outros módulos
    AuthModule,
  ],
})
export class AppModule {}
```

## Uso

### Aplicando o Guard em Rotas Específicas

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from './auth/guards/firebase-auth.guard';

@Controller('exemplo')
export class ExemploController {
  @UseGuards(FirebaseAuthGuard)
  @Get()
  getProtectedRoute() {
    return { message: 'Esta rota é protegida' };
  }
}
```

### Aplicando o Guard Globalmente

Para aplicar o guard de autenticação globalmente em toda a aplicação, você pode modificar o arquivo `main.ts`:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseAuthGuard } from './auth/guards/firebase-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Aplicar o guard globalmente
  const firebaseAuthGuard = app.get(FirebaseAuthGuard);
  app.useGlobalGuards(firebaseAuthGuard);
  
  await app.listen(3000);
}
bootstrap();
```

### Marcando Rotas como Públicas

Para marcar rotas específicas como públicas (sem necessidade de autenticação), use o decorator `@Public()`:

```typescript
import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller('exemplo')
export class ExemploController {
  @Public()
  @Get('publico')
  getPublicRoute() {
    return { message: 'Esta rota é pública' };
  }
}
```

## Testando a Autenticação

1. Faça login no frontend usando o Firebase Authentication
2. Obtenha o token ID do usuário autenticado
3. Inclua o token no cabeçalho de autorização das requisições:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

4. Acesse a rota `/auth/profile` para verificar se a autenticação está funcionando corretamente. 