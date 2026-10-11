import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';
import { CreateStoreDto } from './dto/store.dto.js';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async createStore(user: JwtPayloadOwner, data: CreateStoreDto) {
    const net = await this.prisma.storeNet.findFirst({
      where: {
        id: data.store_net_id,
      },
    });
    if (!net) {
      throw new NotFoundException('Store Network not found');
    }
    if (net.owner_id !== user.id) {
      throw new ForbiddenException('You can not delete this Store Network');
    }
    const newStore = await this.prisma.store.create({
      data: {
        name: data.name,
        description: data.description,
        address: data.address,
        map_url: data.map_url,
        number: data.number,
        store_net_id: data.store_net_id,
      },
    });
    return newStore;
  }
}
