import React, { ReactElement } from "react";
import LayoutUser from "../src/main/common/Layout/LayoutUser";
import UpdatePassword from "../src/main/containers/UpdatePassword";

export default function UpdatePasswordPage() {
  return <UpdatePassword />;
}

UpdatePasswordPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutUser>{page}</LayoutUser>;
};
