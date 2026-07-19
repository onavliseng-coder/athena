export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}
export interface RefreshTokenResponse {
  accessToken: string;
}
