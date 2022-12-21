import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  currentUserState
} from "../../../service/auth/auth.reducer";
import LayoutRoot from "./LayoutRoot";

type Props = {
  children: React.ReactNode;
};

export default function LayoutAuth(props: Props) {
  const router = useRouter();
  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    if (!currentUser) router.push("/");
  }, [currentUser, router]);

  return <LayoutRoot>{props.children}</LayoutRoot>;
}
