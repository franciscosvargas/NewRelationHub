import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Verifica se a rota está marcada como pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se a rota for pública, permite o acesso sem autenticação
    if (isPublic) {
      return true;
    }

    // Caso contrário, usa a estratégia de autenticação do Firebase
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest<TUser = any>(err: any, user: TUser, info: any): TUser {
    // Você pode personalizar o tratamento de erros aqui
    if (err || !user) {
      throw err || new UnauthorizedException('Não autorizado');
    }
    return user;
  }
}
