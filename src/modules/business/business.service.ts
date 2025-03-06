import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Prisma } from '@prisma/client';
import { ListBusinessesQueryDto } from './dto/list-businesses-query.dto';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBusinessDto) {
    const { address, social, ...rest } = data;

    const existingBusiness = await this.prisma.business.findUnique({
      where: { taxId: data.taxId },
    });

    if (existingBusiness) {
      throw new ConflictException('Business with this tax ID already exists');
    }

    // Create the business with its relations first
    const business = await this.prisma.business.create({
      data: {
        ...rest,
        social: social as Prisma.InputJsonValue,
      },
      include: {
        address: true,
      },
    });

    if (address) {
      const newAddress = await this.prisma.address.create({
        data: {
          street: address.street,
          number: address.number,
          complement: address.complement,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          businessId: business.id,
        },
      });

      // Update business with address ID
      await this.prisma.business.update({
        where: { id: business.id },
        data: { addressId: newAddress.id },
      });

      return this.prisma.business.findUnique({
        where: { id: business.id },
        include: { address: true },
      });
    }

    return business;
  }

  async findAll(query?: ListBusinessesQueryDto) {
    const { orderBy, orderDirection } = query || {};

    return this.prisma.business.findMany({
      include: {
        address: true,
      },
      orderBy: orderBy
        ? {
            [orderBy]: orderDirection || 'asc',
          }
        : undefined,
    });
  }

  async findOne(id: number) {
    return this.prisma.business.findUnique({
      where: { id },
      include: {
        address: true,
      },
    });
  }

  async update(id: number, data: UpdateBusinessDto) {
    const { address, social, ...rest } = data;

    // Update JSON fields if they exist in the update data
    const updateData: Prisma.BusinessUpdateInput = { ...rest };

    if (social) {
      updateData.social = JSON.parse(
        JSON.stringify(social),
      ) as Prisma.InputJsonValue;
    }

    // Update the business
    const business = await this.prisma.business.update({
      where: { id },
      data: updateData,
      include: {
        services: {
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
        address: true,
      },
    });

    // If address data is provided, update or create the address
    if (address) {
      // Type assertion for address object
      const addressData = {
        street: address.street,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
      };

      if (business.addressId) {
        // Update existing address
        await this.prisma.address.update({
          where: { id: business.addressId },
          data: addressData,
        });
      } else {
        // Create new address and link it to the business
        const newAddressData = {
          ...addressData,
          businessId: business.id,
        };

        const newAddress = await this.prisma.address.create({
          data: newAddressData,
        });

        // Update the business with the new address ID
        await this.prisma.business.update({
          where: { id: business.id },
          data: {
            addressId: newAddress.id,
          },
        });
      }

      // Fetch the updated business with the address
      return this.prisma.business.findUnique({
        where: { id: business.id },
        include: {
          services: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
          address: true,
        },
      });
    }

    return business;
  }

  async remove(id: number) {
    // Get the business to check if it has an address
    const business = await this.prisma.business.findUnique({
      where: { id },
      include: { address: true },
    });

    // If the business has an address, delete it first
    if (business?.addressId) {
      await this.prisma.address.delete({
        where: { id: business.addressId },
      });
    }

    // Delete the business
    return this.prisma.business.delete({
      where: { id },
      include: {
        services: true,
        address: true,
      },
    });
  }
}
