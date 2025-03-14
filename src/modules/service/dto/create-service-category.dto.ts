import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateServiceCategoryDto {
  @ApiProperty({
    example: 'Hair Services',
    description: 'Name of the service category',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'All hair-related services',
    description: 'Description of the category',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the business',
  })
  @IsNumber()
  businessId: number;
}
