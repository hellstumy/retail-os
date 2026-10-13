import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';

@Injectable()
export class ValidatorService {
  constructor(private readonly prisma: PrismaService) {}

  async validateStoreAccess(
    storeId: string,
    user: JwtPayloadOwner,
  ): Promise<void> {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
      },
      include: {
        store_net: true,
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    if (store.store_net.owner_id !== user.id) {
      throw new ForbiddenException('You cannot access this store');
    }
  }
  async validateNetAccess(id: string, user: JwtPayloadOwner) {
    const net = await this.prisma.storeNet.findFirst({
      where: {
        id,
      },
    });
    if (!net) {
      throw new NotFoundException('Store Network not found');
    }
    if (net.owner_id !== user.id) {
      throw new ForbiddenException('You can not acces this Store Network');
    }
  }
}
