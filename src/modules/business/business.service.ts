import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBusinessDto) {
    const { address, social, manyChatFlows, credentials, ...rest } = data;
    return this.prisma.business.create({
      data: {
        ...rest,
        address: address ? JSON.parse(JSON.stringify(address)) : undefined,
        social: social ? JSON.parse(JSON.stringify(social)) : undefined,
        manyChatFlows: manyChatFlows
          ? JSON.parse(JSON.stringify(manyChatFlows))
          : undefined,
        credentials: credentials
          ? JSON.parse(JSON.stringify(credentials))
          : undefined,
      },
      include: {
        services: true,
      },
    });
  }

  async findAll() {
    return this.prisma.business.findMany({
      include: {
        services: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.business.findUnique({
      where: { id },
      include: {
        services: true,
      },
    });
  }

  async update(id: number, data: UpdateBusinessDto) {
    // Since UpdateBusinessDto is a partial type, we need to handle properties that might not exist
    const updateData: any = { ...data };

    // Only process JSON fields if they exist in the update data
    if ('address' in data && data.address) {
      updateData.address = JSON.parse(JSON.stringify(data.address));
    }

    if ('social' in data && data.social) {
      updateData.social = JSON.parse(JSON.stringify(data.social));
    }

    if ('manyChatFlows' in data && data.manyChatFlows) {
      updateData.manyChatFlows = JSON.parse(JSON.stringify(data.manyChatFlows));
    }

    if ('credentials' in data && data.credentials) {
      updateData.credentials = JSON.parse(JSON.stringify(data.credentials));
    }

    return this.prisma.business.update({
      where: { id },
      data: updateData,
      include: {
        services: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.business.delete({
      where: { id },
      include: {
        services: true,
      },
    });
  }
}
