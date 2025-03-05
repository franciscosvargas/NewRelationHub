import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service, ServiceCategory } from '@prisma/client';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  // Service endpoints
  @Post()
  async createService(
    @Body()
    data: {
      name: string;
      description?: string;
      price: number;
      duration: number;
      businessId: number;
    },
  ): Promise<Service> {
    return this.serviceService.createService(data);
  }

  @Get()
  async findAllServices(): Promise<Service[]> {
    return this.serviceService.findAllServices();
  }

  @Get(':id')
  async findServiceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Service | null> {
    return this.serviceService.findServiceById(id);
  }

  @Put(':id')
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Service>,
  ): Promise<Service> {
    return this.serviceService.updateService(id, data);
  }

  @Delete(':id')
  async deleteService(@Param('id', ParseIntPipe) id: number): Promise<Service> {
    return this.serviceService.deleteService(id);
  }

  // ServiceCategory endpoints
  @Post('categories')
  async createServiceCategory(
    @Body() data: { name: string; description?: string },
  ): Promise<ServiceCategory> {
    return this.serviceService.createServiceCategory(data);
  }

  @Get('categories')
  async findAllServiceCategories(): Promise<ServiceCategory[]> {
    return this.serviceService.findAllServiceCategories();
  }

  @Get('categories/:id')
  async findServiceCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceCategory | null> {
    return this.serviceService.findServiceCategoryById(id);
  }

  @Put('categories/:id')
  async updateServiceCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<ServiceCategory>,
  ): Promise<ServiceCategory> {
    return this.serviceService.updateServiceCategory(id, data);
  }

  @Delete('categories/:id')
  async deleteServiceCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceCategory> {
    return this.serviceService.deleteServiceCategory(id);
  }

  // Service-to-Category relation endpoints
  @Post(':serviceId/categories/:categoryId')
  async addCategoryToService(
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    return this.serviceService.addCategoryToService(serviceId, categoryId);
  }

  @Delete(':serviceId/categories/:categoryId')
  async removeCategoryFromService(
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    return this.serviceService.removeCategoryFromService(serviceId, categoryId);
  }
}
