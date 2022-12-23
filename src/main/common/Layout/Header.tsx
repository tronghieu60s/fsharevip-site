import { User } from "firebase/auth";
import { Alert, Avatar, Dropdown, Navbar } from "flowbite-react";
import md5 from "md5";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Lock } from "react-feather";
import toast from "react-hot-toast";
import NoSSR from "react-no-ssr";
import {
  MESSAGE_AUTH_EMAIL_CONFIRMATION_SENT,
  MESSAGE_AUTH_SIGN_OUT_SUCCESS,
} from "../../../const/message";
import {
  firebaseCheckAuth,
  firebaseSendEmailVerification,
  firebaseSignOut,
} from "../../../utils/firebase/firebaseAuth";

export default function Header() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const emailVerified = currentUser?.emailVerified;

  useEffect(() => {
    firebaseCheckAuth((user) => {
      setCurrentUser(user);
    });
  }, []);

  const onLogout = useCallback(() => {
    firebaseSignOut().then(() => toast.success(MESSAGE_AUTH_SIGN_OUT_SUCCESS));
  }, []);

  const onEmailVerification = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      firebaseSendEmailVerification().then(() => {
        toast.success(MESSAGE_AUTH_EMAIL_CONFIRMATION_SENT);
      });
    },
    []
  );

  const avatar = useMemo(
    () =>
      currentUser?.photoURL ||
      `https://www.gravatar.com/avatar/${md5(currentUser?.email || "")}`,
    [currentUser?.email, currentUser?.photoURL]
  );

  const displayName = useMemo(
    () => currentUser?.displayName || currentUser?.email?.split("@")?.[0],
    [currentUser?.displayName, currentUser?.email]
  );

  return (
    <React.Fragment>
      <NoSSR>
        {currentUser && !emailVerified && (
          <Alert color="success" className="my-3">
            Bạn hãy kiểm tra email của mình để xác nhận tài khoản nhé! Nếu không
            thấy hãy nhấn vào{" "}
            <a
              href="#"
              className="text-red-500 underline"
              onClick={onEmailVerification}
            >
              đây
            </a>{" "}
            để gửi lại email xác nhận.
          </Alert>
        )}
      </NoSSR>
      <Navbar fluid={true} rounded={true} className="bg-transparent">
        <Navbar.Brand href="https://flowbite.com/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <NoSSR>
            {!!currentUser && (
              <div className="flex items-center text-sm">
                <Avatar
                  size="sm"
                  img={avatar}
                  rounded={true}
                  className="mr-2"
                />
                <Dropdown size="sm" inline={true} label={displayName}>
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {displayName} (
                      <span className="text-red-600">3000 point</span>)
                    </span>
                    <span className="block text-sm font-medium truncate">
                      {currentUser.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={() => router.push("/thong-ke")}>
                    Thống Kê
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => router.push("/mua-luot-tai")}>
                    Mua Lượt Tải
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout}>Đăng Xuất</Dropdown.Item>
                </Dropdown>
              </div>
            )}
          </NoSSR>
          <Link
            href="/sign-in"
            className="flex items-center bg-white hover:bg-gray-400 text-sm text-gray-800 p-2 rounded-md"
            hidden={!!currentUser}
          >
            <Lock size={15} className="mr-1" /> Đăng Nhập
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active={true}>
            Trang Chủ
          </Navbar.Link>
          <Navbar.Link href="/navbars">Giới Thiệu</Navbar.Link>
          <Navbar.Link href="/navbars">Dịch Vụ</Navbar.Link>
          <Navbar.Link href="/navbars">Nâng Cấp</Navbar.Link>
          <Navbar.Link href="/navbars">Liên Hệ</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
}
