import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../../service/auth/auth.reducer";
import LayoutRoot from "./LayoutRoot";

type Props = {
  children: React.ReactNode;
};

export default function LayoutAuth(props: Props) {
  const router = useRouter();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (auth) {
      router.push("/");
    }
  }, []);

  return <LayoutRoot>{props.children}</LayoutRoot>;
}
