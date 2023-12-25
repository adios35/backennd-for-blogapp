import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function getUsers(_, res) {
  try {
    const users = await client.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}
