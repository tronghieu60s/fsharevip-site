import { useRouter } from "next/router";
import React, { useEffect } from "react";
import auth, { firebaseCheckAuth } from "../../../utils/firebase/firebaseAuth";
import Author from "./Author";
import LayoutRoot from "./LayoutRoot";

type Props = {
  children: React.ReactNode;
};

export default function LayoutUser(props: Props) {
  const router = useRouter();

  useEffect(() => {
    firebaseCheckAuth((user) => {
      if (!user) router.push("/sign-in");
    });
  }, [router]);

  return (
    <LayoutRoot>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <Author />
        </div>
        <div className="col-span-3">{props.children}</div>
      </div>
    </LayoutRoot>
  );
}
