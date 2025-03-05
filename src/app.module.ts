import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessModule } from './modules/business/business.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceModule } from './modules/service/service.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, BusinessModule, ServiceModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
