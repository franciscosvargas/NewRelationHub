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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceResponseExamples } from './swagger/service-responses';

@ApiTags('services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse(ServiceResponseExamples.createService)
  async createService(@Body() data: CreateServiceDto): Promise<Service> {
    return this.serviceService.createService(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse(ServiceResponseExamples.findAllServices)
  async findAllServices(): Promise<Service[]> {
    return this.serviceService.findAllServices();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a service by id' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse(ServiceResponseExamples.findServiceById)
  @ApiResponse(ServiceResponseExamples.notFound)
  async findServiceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Service | null> {
    return this.serviceService.findServiceById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse(ServiceResponseExamples.updateService)
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateServiceDto,
  ): Promise<Service> {
    return this.serviceService.updateService(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse(ServiceResponseExamples.deleteService)
  async deleteService(@Param('id', ParseIntPipe) id: number): Promise<Service> {
    return this.serviceService.deleteService(id);
  }

  @Post('categories')
  @ApiOperation({ summary: 'Create a new service category' })
  @ApiResponse(ServiceResponseExamples.createServiceCategory)
  async createServiceCategory(
    @Body() data: CreateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return this.serviceService.createServiceCategory(data);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all service categories' })
  @ApiResponse(ServiceResponseExamples.findAllServiceCategories)
  async findAllServiceCategories(): Promise<ServiceCategory[]> {
    return this.serviceService.findAllServiceCategories();
  }

  @Get('categories/:id')
  @ApiOperation({ summary: 'Get a service category by id' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse(ServiceResponseExamples.findServiceCategoryById)
  async findServiceCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceCategory | null> {
    return this.serviceService.findServiceCategoryById(id);
  }

  @Put('categories/:id')
  @ApiOperation({ summary: 'Update a service category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse(ServiceResponseExamples.updateServiceCategory)
  async updateServiceCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return this.serviceService.updateServiceCategory(id, data);
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: 'Delete a service category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse(ServiceResponseExamples.deleteServiceCategory)
  async deleteServiceCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ServiceCategory> {
    return this.serviceService.deleteServiceCategory(id);
  }

  @Post(':serviceId/categories/:categoryId')
  @ApiOperation({ summary: 'Add a category to a service' })
  @ApiParam({ name: 'serviceId', description: 'Service ID' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @ApiResponse(ServiceResponseExamples.addCategoryToService)
  async addCategoryToService(
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    return this.serviceService.addCategoryToService(serviceId, categoryId);
  }

  @Delete(':serviceId/categories/:categoryId')
  @ApiOperation({ summary: 'Remove a category from a service' })
  @ApiParam({ name: 'serviceId', description: 'Service ID' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @ApiResponse(ServiceResponseExamples.removeCategoryFromService)
  async removeCategoryFromService(
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    return this.serviceService.removeCategoryFromService(serviceId, categoryId);
  }
}
