import { ReactElement } from "react";
import LayoutAuth from "../src/main/common/Layout/LayoutAuth";
import SignIn from "../src/main/containers/SignIn";

export default function SignInPage() {
  return <SignIn />;
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuth>{page}</LayoutAuth>;
};
