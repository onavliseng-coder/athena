import { prisma } from "../../database/prisma.js";

import type { CreateUserInput } from "./types.js";

export class UsersRepository {
  async create(data: CreateUserInput) {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(id: string, data: Partial<CreateUserInput>) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
