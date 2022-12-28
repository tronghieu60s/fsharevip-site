import { ReactElement } from "react";
import LayoutUser from "../src/main/common/Layout/LayoutUser";
import PayIn from "../src/main/containers/PayIn";

export default function PayInPage() {
  return <PayIn />;
}

PayInPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutUser>{page}</LayoutUser>;
};
