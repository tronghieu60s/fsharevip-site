import { UserType } from "../user/user.types";

export type SignInType = {
  user: UserType;
  accessToken: string;
};