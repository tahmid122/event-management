import { TUser } from "./user";

export interface TAuthResponse {
  success: boolean;
  message: string;
  data: TUser;
}
