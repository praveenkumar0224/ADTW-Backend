import { encryptPassword } from "../utils/encryption.js";
import prisma from "../client.js";
import { Role } from "@prisma/client";

async function createAdmin() {
  const credentials = {
    mobile_number: "9876543210",
    password: await encryptPassword("qwertY#123"),
    roles: Role.ADMIN,
  };

  const existsinguser = await prisma.user.findFirst({
    where: { mobile_number: credentials.mobile_number },
  });

  if (existsinguser) {
    console.log("Admin Already present");
    return;
  }
  const user = await prisma.user.create({ data: credentials });
  console.log("Admin created Successfully");
  return true;
}

export default createAdmin;
