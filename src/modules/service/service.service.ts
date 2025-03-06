import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Service, ServiceCategory } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ListServicesQueryDto } from './dto/list-services-query.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  // Service methods
  async createService(data: CreateServiceDto): Promise<Service> {
    return this.prisma.service.create({
      data,
    });
  }

  async findAllServices(query?: ListServicesQueryDto): Promise<Service[]> {
    const { businessId, categoryId, orderBy, orderDirection } = query || {};

    return this.prisma.service.findMany({
      where: {
        AND: [
          businessId ? { businessId } : {},
          categoryId
            ? {
                categories: {
                  some: {
                    categoryId,
                  },
                },
              }
            : {},
        ],
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: orderBy
        ? {
            [orderBy]: orderDirection || 'asc',
          }
        : undefined,
    });
  }

  async findServiceById(id: number): Promise<Service | null> {
    return this.prisma.service.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async updateService(id: number, data: UpdateServiceDto): Promise<Service> {
    return this.prisma.service.update({
      where: { id },
      data,
    });
  }

  async deleteService(id: number): Promise<Service> {
    return this.prisma.service.delete({
      where: { id },
    });
  }

  // ServiceCategory methods
  async createServiceCategory(data: {
    name: string;
    description?: string;
  }): Promise<ServiceCategory> {
    return this.prisma.serviceCategory.create({
      data,
    });
  }

  async findAllServiceCategories(): Promise<ServiceCategory[]> {
    return this.prisma.serviceCategory.findMany({
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });
  }

  async findServiceCategoryById(id: number): Promise<ServiceCategory | null> {
    return this.prisma.serviceCategory.findUnique({
      where: { id },
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });
  }

  async updateServiceCategory(
    id: number,
    data: Partial<ServiceCategory>,
  ): Promise<ServiceCategory> {
    return this.prisma.serviceCategory.update({
      where: { id },
      data,
    });
  }

  async deleteServiceCategory(id: number): Promise<ServiceCategory> {
    return this.prisma.serviceCategory.delete({
      where: { id },
    });
  }

  // Service-to-Category relation methods
  async addCategoryToService(
    serviceId: number,
    categoryId: number,
  ): Promise<void> {
    await this.prisma.serviceToCategory.create({
      data: {
        serviceId,
        categoryId,
      },
    });
  }

  async removeCategoryFromService(
    serviceId: number,
    categoryId: number,
  ): Promise<void> {
    await this.prisma.serviceToCategory.delete({
      where: {
        serviceId_categoryId: {
          serviceId,
          categoryId,
        },
      },
    });
  }
}
