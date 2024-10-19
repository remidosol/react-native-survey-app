export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  username: string | null;
  userId: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

type Address = {
  city?: string;
  street?: string;
  number?: number;
  zipcode?: string;
  geolocation?: Geolocation;
};

type Geolocation = {
  lat?: string;
  long?: string;
};

type Name = {
  firstname?: string;
  lastname?: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  name?: Name;
  address?: Address;
  phone?: string;
  birthday?: string;
  gender?: "male" | "female";
};

export interface AuthResponse {
  token: string;
  username: string;
}

export type StoredUserData = {
  user?: Partial<User>;
  token?: string;
};
