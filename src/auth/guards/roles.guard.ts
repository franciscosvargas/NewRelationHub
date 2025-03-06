import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const firebaseUser = request.user;

    if (!firebaseUser) {
      return false;
    }

    // Get the user from the database using the Firebase UID
    const user = await this.prisma.user.findUnique({
      where: { firebaseAuthId: firebaseUser.uid },
    });

    if (!user) {
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}
