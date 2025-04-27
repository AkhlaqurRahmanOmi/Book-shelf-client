export interface User {
  id: string;
  email: string;
  username?: string;
  name?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
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
