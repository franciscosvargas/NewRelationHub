import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum BusinessOrderField {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class ListBusinessesQueryDto {
  @ApiPropertyOptional({
    description: 'Field to order businesses by',
    enum: BusinessOrderField,
    example: BusinessOrderField.NAME,
  })
  @IsOptional()
  @IsEnum(BusinessOrderField)
  orderBy?: BusinessOrderField;

  @ApiPropertyOptional({
    description: 'Order direction (asc or desc)',
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  orderDirection?: 'asc' | 'desc' = 'asc';
}
