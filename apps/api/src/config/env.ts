export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",

  port: Number(process.env.PORT ?? 3333),

  jwtSecret:
    process.env.JWT_SECRET ??
    "development-secret-change-this-before-production",

  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",

  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "30d",
};
