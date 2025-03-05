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
import { BusinessJsonFields } from '../../../types/json-fields';

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
  @Type(() => Object)
  address?: BusinessJsonFields['address'];

  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  social?: BusinessJsonFields['social'];

  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  manyChatFlows?: BusinessJsonFields['manyChatFlows'];

  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  credentials?: BusinessJsonFields['credentials'];
}
