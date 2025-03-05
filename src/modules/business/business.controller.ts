import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BusinessResponseExamples } from './swagger/business-responses';

@ApiTags('businesses')
@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new business' })
  @ApiResponse(BusinessResponseExamples.create)
  @ApiResponse(BusinessResponseExamples.badRequest)
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all businesses' })
  @ApiResponse(BusinessResponseExamples.findAll)
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a business by id' })
  @ApiParam({ name: 'id', description: 'Business ID' })
  @ApiResponse(BusinessResponseExamples.findOne)
  @ApiResponse(BusinessResponseExamples.notFound)
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(parseInt(id, 10));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a business' })
  @ApiParam({ name: 'id', description: 'Business ID' })
  @ApiResponse(BusinessResponseExamples.update)
  @ApiResponse(BusinessResponseExamples.notFound)
  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessService.update(parseInt(id, 10), updateBusinessDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a business' })
  @ApiParam({ name: 'id', description: 'Business ID' })
  @ApiResponse(BusinessResponseExamples.remove)
  @ApiResponse(BusinessResponseExamples.notFound)
  remove(@Param('id') id: string) {
    return this.businessService.remove(parseInt(id, 10));
  }
}
