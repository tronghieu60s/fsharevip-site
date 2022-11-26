import { ReactElement } from "react";
import LayoutRoot from "../src/main/common/Layout/LayoutRoot";
import SignUp from "../src/main/containers/SignUp";

export default function SignUpPage() {
  return <SignUp />;
}

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutRoot>{page}</LayoutRoot>;
};
