export interface User {
  id?: string;
  email: string;
  username?: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  username?: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
