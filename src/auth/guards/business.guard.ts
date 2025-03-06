import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRoles } from '@prisma/client';

@Injectable()
export class BusinessGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const firebaseUser = request.user;
    const businessId = parseInt(
      request.params?.businessId ||
        request.query?.businessId ||
        request.body?.businessId,
    );

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

    // System admins can access all businesses
    if (user.role === UserRoles.SYSTEM_ADMIN) {
      return true;
    }

    // If no business ID is provided in the request, allow access
    if (!businessId) {
      return true;
    }

    // For other users, check if they belong to the requested business
    if (user.businessId !== businessId) {
      throw new ForbiddenException('You do not have access to this business');
    }

    return true;
  }
}
