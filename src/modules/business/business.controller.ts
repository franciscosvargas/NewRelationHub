import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { BusinessResponseExamples } from './swagger/business-responses';
import { FirebaseAuthGuard } from '../../auth/guards/firebase-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { BusinessGuard } from '../../auth/guards/business.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Public } from '../../auth/decorators/public.decorator';
import { UserRoles } from '@prisma/client';
import { ListBusinessesQueryDto } from './dto/list-businesses-query.dto';

@ApiTags('businesses')
@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRoles.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Create a new business' })
  @ApiResponse(BusinessResponseExamples.create)
  @ApiResponse(BusinessResponseExamples.badRequest)
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all businesses (public endpoint)' })
  @ApiResponse(BusinessResponseExamples.findAll)
  @ApiQuery({ type: ListBusinessesQueryDto })
  findAllPublic(@Query() query: ListBusinessesQueryDto) {
    return this.businessService.findAll(query);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRoles.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Get all businesses (admin only)' })
  @ApiResponse(BusinessResponseExamples.findAll)
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard, BusinessGuard)
  @Roles(
    UserRoles.SYSTEM_ADMIN,
    UserRoles.BUSINESS_ADMIN,
    UserRoles.BUSINESS_USER,
  )
  @ApiOperation({ summary: 'Get a business by id' })
  @ApiParam({ name: 'id', description: 'Business ID' })
  @ApiResponse(BusinessResponseExamples.findOne)
  @ApiResponse(BusinessResponseExamples.notFound)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.businessService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard, BusinessGuard)
  @Roles(UserRoles.SYSTEM_ADMIN, UserRoles.BUSINESS_ADMIN)
  @ApiOperation({ summary: 'Update a business' })
  @ApiParam({ name: 'id', description: 'Business ID' })
  @ApiResponse(BusinessResponseExamples.update)
  @ApiResponse(BusinessResponseExamples.notFound)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(UserRoles.SYSTEM_ADMIN)
  @ApiOperation({ summary: 'Delete a business' })
  @ApiParam({ name: 'id', description: 'Business ID' })
  @ApiResponse(BusinessResponseExamples.remove)
  @ApiResponse(BusinessResponseExamples.notFound)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.businessService.remove(id);
  }
}
