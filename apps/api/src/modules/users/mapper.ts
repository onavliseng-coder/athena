import type { User } from "../../generated/prisma/client.js";

export class UserMapper {
  static toResponse(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toResponseList(users: User[]) {
    return users.map((user) => UserMapper.toResponse(user));
  }
}
