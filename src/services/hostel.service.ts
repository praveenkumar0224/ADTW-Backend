import Fuse from "fuse.js";
import prisma from "../client.js";
import { service } from "../lib/services/service.js";
import * as R from "remeda";

const customServices = {
  searchHostel: async (keyword: string) => {
    const hostel = await prisma.hostel.findMany({
      where: {
        is_active: true,
      },
    });
    const fuse = new Fuse(hostel, {
      keys: [
        "district_name",
        "hostel_name_tamil",
        "hostel_name_english",
        "hostel_address_tamil",
        "hostel_address_english",
        "warden_name",
        "mobile_number"
      ],
      threshold: 0.5,
      location: 0,
      distance: 100,
      includeMatches: true,
      includeScore: true,
      useExtendedSearch: true,
    });
    const hostelSearch = fuse.search(keyword);
    if (R.hasAtLeast(hostelSearch, 1)) {
      return hostelSearch.at(0)?.item;
    }
    return [];
  },
};
const CRUDServices = service<"hostel">("hostel");

export const hostelService = { ...customServices, ...CRUDServices };
