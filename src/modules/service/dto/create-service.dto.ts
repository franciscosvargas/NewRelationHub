import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Haircut',
    description: 'Name of the service',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Professional haircut service',
    description: 'Description of the service',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 50.0,
    description: 'Price of the service in the local currency',
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 30,
    description: 'Duration of the service in minutes',
  })
  @IsNumber()
  @Min(1)
  duration: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the business that offers this service',
  })
  @IsNumber()
  businessId: number;
}
