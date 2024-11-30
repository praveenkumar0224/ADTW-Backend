import Fuse from "fuse.js";
import prisma from "../client.js";
import { service } from "../lib/services/service.js";
import * as R from "remeda";

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
};
const CRUDServices = service<"question">("question");

export const questionService = { ...CRUDServices, ...customServices };
