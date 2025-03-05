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

export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipCode: string;
}

export class SocialDto {
  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  googleMyBusiness?: string;
}

export class CreateBusinessDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(BusinessSegment)
  segment: BusinessSegment;

  @IsOptional()
  @Matches(/^\d{14}$/, { message: 'Tax ID must be exactly 14 digits' })
  taxId?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialDto)
  social?: SocialDto;
}
