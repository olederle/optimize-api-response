import { PaginationType } from "./pagination";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
};

export type UserResponse = {
  users: Array<User>;
  pagination?: {
    cursor?: string;
    offset?: number;
    page?: number;
    pageSize?: number;
    total?: number;
    type: PaginationType;
  };
};
