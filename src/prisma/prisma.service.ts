/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();

    const modelsWithSoftDelete = [
      'Business',
      'Integration',
      'Address',
      'Contact',
      'BusinessContact',
      'User',
      'Service',
    ];

    // // Middleware for soft delete operations
    // this.$use(async (params, next) => {

    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    //   return next(params);
    // });

    // Add middleware to exclude soft-deleted records
    this.$use(async (params, next) => {
      // List of models that have deletedAt field

      const modelsWithSoftDelete = [
        'Business',
        'Integration',
        'Address',
        'Contact',
        'BusinessContact',
        'User',
        'Service',
      ];
      // Check if the model has soft delete capability
      if (params.model && modelsWithSoftDelete.includes(params.model)) {
        // For findUnique operations, convert to findFirst to apply filters
        if (params.action === 'findUnique' || params.action === 'findFirst') {
          params.action = 'findFirst';
          params.args.where = {
            ...params.args.where,
            deletedAt: null,
          };
        }

        // For findMany operations
        if (params.action === 'findMany') {
          if (params.args.where) {
            if (params.args.where.deletedAt === undefined) {
              params.args.where.deletedAt = null;
            }
          } else {
            params.args.where = { deletedAt: null };
          }
        }

        // Handle count operations
        if (params.action === 'count') {
          if (params.args.where) {
            if (params.args.where.deletedAt === undefined) {
              params.args.where.deletedAt = null;
            }
          } else {
            params.args.where = { deletedAt: null };
          }
        }

        // Handle aggregate operations
        if (params.action === 'aggregate') {
          if (params.args.where) {
            if (params.args.where.deletedAt === undefined) {
              params.args.where.deletedAt = null;
            }
          } else {
            params.args.where = { deletedAt: null };
          }
        }

        // Check if this is a delete operation
        if (params.action === 'delete') {
          // Change action to update
          params.action = 'update';
          params.args.data = { deletedAt: new Date() };
        }

        // Check if this is a deleteMany operation
        if (params.action === 'deleteMany') {
          // Change action to updateMany
          params.action = 'updateMany';
          if (params.args.data !== undefined) {
            params.args.data.deletedAt = new Date();
          } else {
            params.args.data = { deletedAt: new Date() };
          }
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return next(params);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
