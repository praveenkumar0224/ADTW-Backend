import * as R from 'remeda';
import prisma from '../../client.js';
import helper from '../../utils/utils.js';
import exclude from '../../utils/exclude.js';

import {
  createInput,
  filterInput,
  ModelName,
  OrderByWithAggregationInput,
  PrismaModels,
  whereInput,
  select,
  updateInput
} from '../../types/lib/service.js';
import ApiError from '../../utils/ApiError.js';
import httpStatus from 'http-status';

export const service = <M extends ModelName>(model: M) => ({
  create: async (data: createInput<M>) => {
    let item = await (prisma[model] as any).create({
      data
    });
    item = exclude(item, ['password']);
    return item as PrismaModels[M];
  },
  list: async (
    filter: filterInput<M>,
    options?: {
      limit?: number;
      page?: number;
      sortBy?: OrderByWithAggregationInput<M>;
    },
    include?: any,
    select?: select<M>
  ) => {
    const page = options?.page ?? 0;
    const limit = options?.limit ?? Number.MAX_SAFE_INTEGER;
    const sortBy = options?.sortBy;
    const payload: any = {
      where: filter,
      skip: page * limit,
      take: limit,
      orderBy: sortBy ? sortBy : undefined
    };

    if (!R.isEmpty(include)) {
      payload.include = include;
    }

    if (!R.isEmpty(select as undefined)) {
      payload.select = select;
    }
    const data = await (prisma[model] as any).findMany(payload);
    return data as Array<PrismaModels[M]>;
  },
  update: async <Key extends keyof PrismaModels[M]>(
    where: whereInput<M>,
    updateBody: updateInput<M>,
    keys: Key[] = Object.keys(prisma[model].fields) as Key[]
  ) => {
    let updatedUser = await (prisma[model] as any).update({
      where,
      data: updateBody,
      select: helper.fieldSelector(keys as string[])
    });
    updatedUser = exclude(updatedUser, ['password']);
    return updatedUser as PrismaModels[M];
  },
  delete: async (where: whereInput<M>) => {
    console.log(where);
    
    await (prisma[model] as any).softDelete(where);
    return true;
  },
  get: async <Key extends keyof PrismaModels[M]>(
    where: whereInput<M>,
    keys: Key[] = Object.keys(prisma[model].fields) as Key[]
  ) => {
    let data = await (prisma[model] as any).findFirst({
      where: where,
      select: helper.fieldSelector(keys as string[])
    });
    if (R.isNullish(data)) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Data Not found');
    }
    return data as PrismaModels[M];
  },
  count: async (
    filter: filterInput<M>,
  ) => {
    const payload: any = {
      where: filter
    };

    const data = await (prisma[model] as any).count(payload);
    return data;
  }
});
