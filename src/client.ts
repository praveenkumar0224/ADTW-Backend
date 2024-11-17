import { Prisma, PrismaClient } from "@prisma/client";
import config from "./config/config.js";
import { encryptPassword } from "./utils/encryption.js";

const xPrisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (
          (operation === "findUnique" ||
            operation === "findMany" ||
            operation === "findFirst" ||
            operation === "findFirstOrThrow" ||
            operation === "update" ||
            operation === "updateMany" ||
            operation === "upsert" ||
            operation === "findUniqueOrThrow") &&
          model !== "softdeletedItems" &&
          model !== "otp"
        ) {
          args.where = { ...args.where, is_active: true };
        }

        return query(args);
      },
    },
    user: {
      async $allOperations({ operation, args, query }) {
        if ((operation === 'create' || operation === 'update') && args.data.password) {
          args.data = {
            ...args.data,
            password: await encryptPassword(args.data.password as string)
          };
        }
        return query(args);
      }
    }
  },
  model: {
    $allModels: {
      async softDelete<T>(this: T, where: Prisma.Args<T, "delete">["where"]) {
        const context = Prisma.getExtensionContext(this);
        const alteredQuery = await (context as any).update({
          where,
          data: {
            deletedAt: new Date(),
            is_active: false,
          },
        });
        await prisma.softdeletedItems.create({
          data: {
            item_id: alteredQuery[`${context.$name}_id`],
            model_name: context.$name || "",
          },
        });
        return alteredQuery;
      },
      async softDeleteMany<T>(
        this: T,
        where: Prisma.Args<T, "delete">["where"]
      ) {
        const context = Prisma.getExtensionContext(this);
        const alteredQuery = await (context as any).updateMany({
          where,
          data: {
            deletedAt: new Date(),
            is_active: false,
          },
        });
        const modelId = (context.$name || "").slice(0, -1);
        alteredQuery.map(async (element: any) => {
          await prisma.softdeletedItems.createMany({
            data: {
              item_id: element[`${modelId}_id`],
              model_name: context.$name || "",
            },
          });
        });
        return alteredQuery;
      },
    },
  },
});

type extendedPrisma = typeof xPrisma;

// Add prisma to the NodeJS global type
type CustomNodeJsGlobal = {
  prisma: extendedPrisma;
} & Global;

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || xPrisma;

if (config.env === "development") {
  global.prisma = prisma;
}

export default prisma;
