import React from "react";
import Author from "../Base/Author";
import LayoutRoot from "./LayoutRoot";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <LayoutRoot>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <Author />
        </div>
        <div className="col-span-3">
          {props.children}
        </div>
      </div>
    </LayoutRoot>
  );
}
