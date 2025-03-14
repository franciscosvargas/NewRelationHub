import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { FirebaseAuthGuard } from './auth/guards/firebase-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('NewRelationHub API')
    .setDescription('API documentation for NewRelationHub')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Add validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Aplicar o guard de autenticação globalmente (descomente para ativar)
  // const firebaseAuthGuard = app.get(FirebaseAuthGuard);
  // app.useGlobalGuards(firebaseAuthGuard);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
