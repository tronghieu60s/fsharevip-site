import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { firebaseCheckAuth } from "../../../utils/firebase/firebaseAuth";
import LayoutRoot from "./LayoutRoot";

type Props = {
  children: React.ReactNode;
};

export default function LayoutAuth(props: Props) {
  const router = useRouter();

  useEffect(() => {
    firebaseCheckAuth((user) => {
      if (user) router.push("/");
    });
  }, [router]);

  return <LayoutRoot>{props.children}</LayoutRoot>;
}
