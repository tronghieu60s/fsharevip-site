import React, { ReactElement } from "react";
import LayoutUser from "../src/main/common/Layout/LayoutUser";

export default function UsingDownloads() {
  return <div></div>;
}

UsingDownloads.getLayout = function getLayout(page: ReactElement) {
  return <LayoutUser>{page}</LayoutUser>;
};
