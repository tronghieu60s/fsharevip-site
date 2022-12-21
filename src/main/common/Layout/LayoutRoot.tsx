import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../../../service/auth/auth.reducer";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function LayoutRoot(props: Props) {
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
    });
  }, [setCurrentUser]);

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
