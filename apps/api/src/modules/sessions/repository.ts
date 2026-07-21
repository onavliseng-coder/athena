import { prisma } from "../../database/prisma.js";

export class SessionsRepository {
  async create(data: {
    userId: string;
    refreshToken: string;
    expiresAt: Date;
  }) {
    return prisma.session.create({
      data,
    });
  }

  async findByRefreshToken(refreshToken: string) {
    return prisma.session.findUnique({
      where: {
        refreshToken,
      },
    });
  }

  async deleteByRefreshToken(refreshToken: string) {
    return prisma.session.delete({
      where: {
        refreshToken,
      },
    });
  }
}
