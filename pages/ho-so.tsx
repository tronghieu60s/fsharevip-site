import { ReactElement } from "react";
import LayoutUser from "../src/main/common/Layout/LayoutUser";
import Profile from "../src/main/containers/Profile";

export default function ProfilePage() {
  return <Profile />;
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutUser>{page}</LayoutUser>;
};
