import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../config/env.js";

export interface JwtPayload {
  sub: string;
  email: string;
  type: "access" | "refresh";
}

export class JwtService {
  signAccessToken(payload: JwtPayload): string {
    const options: SignOptions = {
      expiresIn: env.jwtAccessExpiresIn as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, env.jwtSecret, options);
  }

  signRefreshToken(payload: JwtPayload): string {
    const options: SignOptions = {
      expiresIn: env.jwtRefreshExpiresIn as SignOptions["expiresIn"],
    };

    return jwt.sign(payload, env.jwtSecret, options);
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, env.jwtSecret) as JwtPayload;
  }
}
