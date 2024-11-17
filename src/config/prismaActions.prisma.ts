const PrismaActionTypes = [
  'findUnique',
  'findUniqueOrThrow',
  'findMany',
  'findFirst',
  'findFirstOrThrow',
  'create',
  'createMany',
  'update',
  'updateMany',
  'upsert',
  'delete',
  'deleteMany',
  'executeRaw',
  'queryRaw',
  'aggregate',
  'count',
  'runCommandRaw',
  'findRaw',
  'groupBy'
];

const PrismaFindAction = ['findMany', 'findFirst', 'findFirstOrThrow'];

const PrismaCreateAction = ['create', 'createMany'];

const PrismaUpdateAction = ['update', 'updateMany', 'upsert'];

const PrismaDeleteAction = ['delete', 'deleteMany'];

export { PrismaFindAction, PrismaCreateAction, PrismaUpdateAction, PrismaDeleteAction };

export default PrismaActionTypes;
