import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtPayloadOwner } from '../types/jwt-payload.type.js';
import { CreateStoreNetDto, UpdateStoreNetDto } from './dto/storenet.dto.js';

@Injectable()
export class StoreNetService {
  constructor(private readonly prisma: PrismaService) {}

  async createStoreNet(data: CreateStoreNetDto, user: JwtPayloadOwner) {
    const owner = await this.prisma.owner.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!owner) {
      throw new UnauthorizedException({ message: 'User not found' });
    }
    const newStoreNet = await this.prisma.storeNet.create({
      data: {
        name: data.name,
        description: data.description,
        owner_id: owner.id,
      },
    });
    return newStoreNet;
  }

  async getAllNets(user: JwtPayloadOwner) {
    const nets = await this.prisma.storeNet.findMany({
      where: {
        owner_id: user.id,
      },
    });
    return nets;
  }
  async getOneNet(id: string, user: JwtPayloadOwner) {
    const net = await this.prisma.storeNet.findFirst({
      where: {
        id,
      },
      include: {
        stores: true,
      },
    });
    if (!net) {
      throw new NotFoundException('Store Network not found');
    }
    if (net.owner_id !== user.id) {
      throw new ForbiddenException('You can not view this Store Network');
    }
    return net;
  }
  async updateNet(id: string, data: UpdateStoreNetDto, user: JwtPayloadOwner) {
    const net = await this.prisma.storeNet.findFirst({
      where: {
        id,
      },
    });
    if (!net) {
      throw new NotFoundException('Store Network not found');
    }
    if (net.owner_id !== user.id) {
      throw new ForbiddenException('You can not delete this Store Network');
    }
    const updatedNet = await this.prisma.storeNet.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    return updatedNet;
  }
  async deleteNet(id: string, user: JwtPayloadOwner) {
    const net = await this.prisma.storeNet.findFirst({
      where: {
        id,
      },
    });
    if (!net) {
      throw new NotFoundException('Store Network not found');
    }
    if (net.owner_id !== user.id) {
      throw new ForbiddenException('You can not delete this Store Network');
    }
    await this.prisma.storeNet.delete({
      where: {
        id,
      },
    });
    return {
      message: 'Store deleted',
    };
  }
}
