import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import Author from "./Author";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div className="container px-4 mx-auto">
      <Header />
      <main
        className="container p-4 mx-auto"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <Author />
          </div>
          <div className="col-span-3">
            {/* <Breadcrumb /> */}
            {props.children}
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
