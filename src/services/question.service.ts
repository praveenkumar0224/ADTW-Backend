import Fuse from "fuse.js";
import prisma from "../client.js";
import { service } from "../lib/services/service.js";
import * as R from "remeda";
import * as prismaClient from "@prisma/client";
import helper from "../utils/utils.js";
import exclude from "../utils/exclude.js";

const customServices = {
  searchQuestion: async (keyword: string) => {
    const question = await prisma.question.findMany({
      where: {
        is_active: true,
      },
    });
    const fuse = new Fuse(question, {
      keys: [
        "hostel_type",
        "question_category",
        "performance_score",
        "question",
      ],
      threshold: 0.5,
      location: 0,
      distance: 100,
      includeMatches: true,
      includeScore: true,
      useExtendedSearch: true,
    });
    const questionSearch = fuse.search(keyword);
    if (R.hasAtLeast(questionSearch, 1)) {
      return questionSearch.at(0)?.item;
    }
    return [];
  },
  create: async (data: any) => {
    const category_name = data.question_category?.category_name;
    delete data.question_category;
    const question = await prisma.question.create({
      data: {
        ...data,
        question_category: {
          connectOrCreate: {
            where: {
              category_name,
            },
            create: {
              category_name,
            },
          },
        },
      },
    });
    return question;
  },
  update: async <Key extends keyof prismaClient.question>(
    where: any,
    updateBody: prismaClient.Prisma.questionUpdateInput,
    keys: Key[] = Object.keys(prisma.question.fields) as Key[]
  ) => {
    let newCategoryName = updateBody?.question_category?.update
      ?.category_name as string;
    const updatedQuestion = await prisma.$transaction(async (tx) => {
      const existingCategory = await tx.categories.findUnique({
        where: { category_name: newCategoryName },
      });
      if (existingCategory) {
        let newUpdatedBody = exclude(updateBody, ["question_category"]);
        let updatedQuestion = await tx.question.update({
          where,
          data: {
            category_id: existingCategory.category_id,
            ...newUpdatedBody,
          },
        });
        return updatedQuestion;
      } else {
        let updatedQuestion = await tx.question.update({
          where,
          data: updateBody,
          select: helper.fieldSelector(keys as string[]),
        });
        return updatedQuestion;
      }
    });
    return updatedQuestion;
  },
};
const CRUDServices = service<"question">("question");

export const questionService = { ...CRUDServices, ...customServices };