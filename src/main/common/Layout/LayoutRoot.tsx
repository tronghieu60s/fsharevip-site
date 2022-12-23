import React from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function LayoutRoot(props: Props) {
  return (
    <div className="container px-4 mx-auto">
      <Header />
      <main
        className="container p-4 mx-auto"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        {props.children}
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
