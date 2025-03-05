import { Prisma } from '@prisma/client';

// Use Prisma's generated types
export type Business = Prisma.BusinessGetPayload<{
  include: { services: true };
}>;

export type Service = Prisma.ServiceGetPayload<{}>;

// Use Prisma's JSON types
export type JsonValue = Prisma.InputJsonValue;
