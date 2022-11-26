import { ReactElement } from "react";
import LayoutRoot from "../src/main/common/Layout/LayoutRoot";

export default function Home() {
  return <div></div>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutRoot>{page}</LayoutRoot>;
};
