import { ReactElement } from "react";
import LayoutRoot from "../src/main/common/Layout/LayoutRoot";
import SignIn from "../src/main/containers/SignIn";

export default function SignInPage() {
  return <SignIn />;
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutRoot>{page}</LayoutRoot>;
};
