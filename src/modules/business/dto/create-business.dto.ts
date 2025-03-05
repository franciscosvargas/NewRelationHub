import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  ValidateNested,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BusinessSegment } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({ example: 'Rua das Flores', description: 'Street name' })
  @IsString()
  street: string;

  @ApiProperty({ example: '123', description: 'Street number' })
  @IsString()
  number: string;

  @ApiPropertyOptional({
    example: 'Apt 101',
    description: 'Address complement',
  })
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiProperty({ example: 'Centro', description: 'Neighborhood name' })
  @IsString()
  neighborhood: string;

  @ApiProperty({ example: 'São Paulo', description: 'City name' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'SP', description: 'State abbreviation' })
  @IsString()
  state: string;

  @ApiProperty({ example: '01234-567', description: 'ZIP code' })
  @IsString()
  zipCode: string;
}

export class SocialDto {
  @ApiPropertyOptional({
    example: '@businessname',
    description: 'Instagram handle',
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({
    example: '+5511999999999',
    description: 'WhatsApp number',
  })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional({
    example: 'businessname',
    description: 'Facebook page name',
  })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiPropertyOptional({
    example: 'Business Name',
    description: 'Google My Business name',
  })
  @IsOptional()
  @IsString()
  googleMyBusiness?: string;
}

export class CreateBusinessDto {
  @ApiProperty({
    example: 'My Business Name',
    description: 'Name of the business',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'A great business description',
    description: 'Description of the business',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: BusinessSegment,
    example: 'BEAUTY',
    description: 'Business segment/category',
  })
  @IsEnum(BusinessSegment)
  segment: BusinessSegment;

  @ApiPropertyOptional({
    example: '12345678901234',
    description: 'Tax ID (CNPJ) - must be exactly 14 digits',
  })
  @IsOptional()
  @Matches(/^\d{14}$/, { message: 'Tax ID must be exactly 14 digits' })
  taxId?: string;

  @ApiPropertyOptional({
    example: 'contact@business.com',
    description: 'Business email address',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '+5511999999999',
    description: 'Business phone number',
  })
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    example: 'www.mybusiness.com',
    description: 'Business website URL',
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({
    type: () => AddressDto,
    description: 'Business address information',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @ApiPropertyOptional({
    type: () => SocialDto,
    description: 'Business social media information',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialDto)
  social?: SocialDto;
}
