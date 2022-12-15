import "../styles/global.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, Suspense } from "react";
import "../src/core/firebase";
import { RecoilRoot } from "recoil";
import LayoutRoot from "../src/main/common/Layout/LayoutRoot";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <LayoutRoot>{page}</LayoutRoot>);

  return <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>;
}
