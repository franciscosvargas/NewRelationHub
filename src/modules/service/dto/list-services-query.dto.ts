import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export enum ServiceOrderField {
  NAME = 'name',
  PRICE = 'price',
  DURATION = 'duration',
  CREATED_AT = 'createdAt',
}

export class ListServicesQueryDto {
  @ApiPropertyOptional({
    description: 'Business ID to filter services',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  businessId?: number;

  @ApiPropertyOptional({
    description: 'Category ID to filter services',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  categoryId?: number;

  @ApiPropertyOptional({
    description: 'Field to order services by',
    enum: ServiceOrderField,
    example: ServiceOrderField.NAME,
  })
  @IsOptional()
  @IsEnum(ServiceOrderField)
  orderBy?: ServiceOrderField;

  @ApiPropertyOptional({
    description: 'Order direction (asc or desc)',
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  orderDirection?: 'asc' | 'desc' = 'asc';
}
