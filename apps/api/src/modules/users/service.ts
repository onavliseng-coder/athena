import { ConflictError } from "../../core/errors/conflict-error.js";
import { NotFoundError } from "../../core/errors/not-found-error.js";
import { PasswordService } from "../../security/password.js";
import { UsersRepository } from "./repository.js";

import type { CreateUserInput } from "./types.js";

export class UsersService {
  constructor(
    private readonly repository = new UsersRepository(),
    private readonly passwordService = new PasswordService(),
  ) {}

  async createUser(data: CreateUserInput) {
    const existingUser = await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("E-mail já cadastrado.");
    }

    const passwordHash = await this.passwordService.hash(data.password);

    return this.repository.create({
      ...data,
      password: passwordHash,
    });
  }

  async listUsers() {
    return this.repository.findAll();
  }

  async getUserById(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado.");
    }

    return user;
  }
}
