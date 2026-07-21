import { UnauthorizedError } from "../../core/errors/unauthorized-error.js";
import { JwtService } from "../../security/jwt.js";
import { PasswordService } from "../../security/password.js";
import { UsersRepository } from "../users/repository.js";
import { SessionsRepository } from "../sessions/repository.js";

import type { LoginSchemaType, RefreshTokenSchemaType } from "./schemas.js";

import type { LoginResponse, RefreshTokenResponse } from "./types.js";

export class AuthService {
  private readonly usersRepository = new UsersRepository();

  private readonly sessionsRepository = new SessionsRepository();

  private readonly passwordService = new PasswordService();

  private readonly jwtService = new JwtService();

  async getAuthenticatedUser(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError("Usuário não encontrado.");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async authenticate(credentials: LoginSchemaType): Promise<LoginResponse> {
    const user = await this.usersRepository.findByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedError("E-mail ou senha inválidos.");
    }

    const passwordMatches = await this.passwordService.verify(
      user.password,
      credentials.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedError("E-mail ou senha inválidos.");
    }

    const accessToken = this.jwtService.signAccessToken({
      sub: user.id,
      email: user.email,
      type: "access",
    });

    const refreshToken = this.jwtService.signRefreshToken({
      sub: user.id,
      email: user.email,
      type: "refresh",
    });

    await this.sessionsRepository.create({
      userId: user.id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
  async refresh(_data: RefreshTokenSchemaType): Promise<RefreshTokenResponse> {
    const payload = this.jwtService.verify(_data.refreshToken);

    const session = await this.sessionsRepository.findByRefreshToken(
      _data.refreshToken,
    );

    if (!session) {
      throw new UnauthorizedError("Sessão inválida.");
    }

    if (payload.type !== "refresh") {
      throw new UnauthorizedError("Refresh Token inválido.");
    }

    const user = await this.usersRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedError("Usuário não encontrado.");
    }
    const accessToken = this.jwtService.signAccessToken({
      sub: user.id,
      email: user.email,
      type: "access",
    });

    return {
      accessToken,
    };
  }
  async logout(refreshToken: string): Promise<void> {
    const session =
      await this.sessionsRepository.findByRefreshToken(refreshToken);

    if (!session) {
      throw new UnauthorizedError("Sessão inválida.");
    }

    await this.sessionsRepository.deleteByRefreshToken(refreshToken);
  }
}
