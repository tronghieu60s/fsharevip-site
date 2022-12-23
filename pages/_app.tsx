import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import LayoutRoot from "../src/main/common/Layout/LayoutRoot";
import "../src/utils/firebase/firebaseConfig";
import "../styles/global.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <LayoutRoot>{page}</LayoutRoot>);

  return getLayout(<Component {...pageProps} />);
}
