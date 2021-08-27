export type Login = {
  name: string;
  phone: string;
};

export type User = {
  id: number;
  name: string;
  avatar?: null | string;
  phone: string;
  province?: null | string;
  district?: null | string;
  ward?: null | string;
  address?: null | string;
};

export type UserGet = {
  phone?: string;
  id?: number;
};

export type Register = {
  phone: string;
  name: string;
  province?: null |  string;
  district?: null |  string;
  ward?: null |  string;
  address?: null |  string;
};
