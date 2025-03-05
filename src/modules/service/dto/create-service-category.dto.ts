import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

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
}
