import { Auth } from "firebase/auth";
import { atom } from "recoil";

export const currentUserState = atom<Auth["currentUser"]>({
  key: "currentUserState",
  default: null,
});
