import { ReactElement } from "react";
import LayoutUser from "../src/main/common/Layout/LayoutUser";
import HistoryUsePoint from "../src/main/containers/HistoryUsePoint";

export default function HistoryUsePointPage() {
  return <HistoryUsePoint />;
}

HistoryUsePointPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutUser>{page}</LayoutUser>;
};
