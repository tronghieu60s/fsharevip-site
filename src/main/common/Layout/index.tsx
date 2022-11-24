import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div className="container px-4 mx-auto">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
