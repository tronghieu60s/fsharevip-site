import React, { ReactElement } from "react";
import LayoutUser from "../src/main/common/Layout/LayoutUser";
import Dashboard from "../src/main/containers/Dashboard";

export default function DashboardPage() {
  return <Dashboard />;
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutUser>{page}</LayoutUser>;
};
