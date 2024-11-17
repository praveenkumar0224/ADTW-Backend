import * as prismaClient from '@prisma/client'; // Adjust your import as necessary
import prisma from '../../client.js';
// Define the types for ModelName and PrismaModels
export type ModelName = Uncapitalize<
  Exclude<Extract<keyof prismaClient.PrismaClient, string>, `$${string}`>
>;

export type PrismaModels = {
  [M in ModelName]: Exclude<
    Awaited<ReturnType<prismaClient.PrismaClient[Uncapitalize<M>]['create']>>,
    null
  >;
};

// Define input types based on models
export type createInput<M extends ModelName> = prismaClient.Prisma.Args<
  (typeof prisma)[M],
  'create'
>['data'];
export type updateInput<M extends ModelName> = prismaClient.Prisma.Args<
  (typeof prisma)[M],
  'update'
>['data'];
export type whereInput<M extends ModelName> = prismaClient.Prisma.Args<
  (typeof prisma)[M],
  'findFirst'
>['where'];
export type filterInput<M extends ModelName> = prismaClient.Prisma.Args<
  (typeof prisma)[M],
  'findMany'
>['where'];
export type OrderByWithAggregationInput<M extends ModelName> = prismaClient.Prisma.Args<
  (typeof prisma)[M],
  'findMany'
>['orderBy'];
export type select<M extends ModelName> = prismaClient.Prisma.Args<
  (typeof prisma)[M],
  'findMany'
>['select'];

// Define the service methods type
export interface Service<M extends ModelName> {
  create(data: createInput): Promise<PrismaModels[M]>;
  list(
    filter: filterInput,
    options: {
      limit?: number;
      page?: number;
      sortBy?: OrderByWithAggregationInput;
    },
    include?: any,
    select?: select
  ): Promise<Array<PrismaModels[M]>>;
  update<Key extends keyof PrismaModels[M]>(
    where: whereInput<M>,
    updateBody: updateInput<M>,
    keys?: Key[]
  ): Promise<PrismaModels[M]>;
  delete(where: whereInput<M>): Promise<boolean>;
  get<Key extends keyof PrismaModels[M]>(
    where: whereInput<M>,
    keys?: Key[]
  ): Promise<PrismaModels[M] | null>;
  count(
    filter: filterInput,
    options: {
      limit?: number;
      page?: number;
      sortBy?: OrderByWithAggregationInput;
    }
  ): Promise<number>;
}
