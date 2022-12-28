import { ReactElement } from "react";
import LayoutUser from "../src/main/common/Layout/LayoutUser";
import HistoryPayment from "../src/main/containers/HistoryPayment";

export default function HistoryPaymentPage() {
  return <HistoryPayment />;
}

HistoryPaymentPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutUser>{page}</LayoutUser>;
};
