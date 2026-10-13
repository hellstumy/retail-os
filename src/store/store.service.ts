import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { JwtPayloadOwner } from '../types/jwt-payload.type.js';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto.js';
import { ValidatorService } from '../validator/validator.service.js';

@Injectable()
export class StoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validate: ValidatorService,
  ) {}

  async createStore(user: JwtPayloadOwner, data: CreateStoreDto) {
    await this.validate.validateNetAccess(data.store_net_id, user);
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
  async getAllStoresByNet(id: string, user: JwtPayloadOwner) {
    await this.validate.validateNetAccess(id, user);

    const stores = await this.prisma.store.findMany({
      where: {
        store_net_id: id,
      },
    });
    return stores;
  }
  async getOneStore(id: string, user: JwtPayloadOwner) {
    await this.validate.validateStoreAccess(id, user);
    const store = await this.prisma.store.findFirst({
      where: {
        id,
      },
      include: {
        employees: true,
        pos_terminals: true,
      },
    });

    return store;
  }

  async updateStore(id: string, data: UpdateStoreDto, user: JwtPayloadOwner) {
    await this.validate.validateStoreAccess(id, user);
    const updatedStore = await this.prisma.store.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
        address: data.address,
        number: data.number,
        map_url: data.map_url,
      },
    });
    return updatedStore;
  }
  async deleteStore(id: string, user: JwtPayloadOwner) {
    await this.validate.validateStoreAccess(id, user);
    await this.prisma.store.delete({
      where: {
        id: id,
      },
    });
    return { message: `store was deletes` };
  }
}
