import { TUser } from "./user";

export interface TAuthResponse {
  token: null | string;
  user: TUser;
}
