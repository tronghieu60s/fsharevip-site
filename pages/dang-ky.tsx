import { ReactElement } from "react";
import LayoutAuth from "../src/main/common/Layout/LayoutAuth";
import SignUp from "../src/main/containers/SignUp";

export default function SignUpPage() {
  return <SignUp />;
}

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuth>{page}</LayoutAuth>;
};
