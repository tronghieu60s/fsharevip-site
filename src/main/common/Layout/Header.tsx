import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import md5 from "md5";
import { User, Lock } from "react-feather";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
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
        <div className="flex items-center text-sm">
          <Avatar
            img={`https://www.gravatar.com/avatar/${md5(
              "tronghieu60s@gmail.com"
            )}`}
            size="sm"
            rounded={true}
            className="mr-2"
          />
          <Dropdown label="Trọng Hiếu" size="sm" inline={true}>
            <Dropdown.Header>
              <span className="block text-sm">
                Trọng Hiếu (<span className="text-red-600">3000 point</span>)
              </span>
              <span className="block text-sm font-medium truncate">
                tronghieu60s@gmail.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => router.push("/thong-ke")}>
              Thống Kê
            </Dropdown.Item>
            <Dropdown.Item onClick={() => router.push("/mua-luot-tai")}>
              Mua Lượt Tải
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Đăng Xuất</Dropdown.Item>
          </Dropdown>
        </div>
        {/* <button className="flex items-center bg-white hover:bg-gray-400 text-sm text-gray-800 p-2 rounded-md">
          <Lock size={15} className="mr-1" /> Đăng Nhập
        </button>
        <button className="flex items-center bg-white hover:bg-gray-400 text-sm text-gray-800 p-2 rounded-md">
          <User size={15} className="mr-1" /> Đăng Ký
        </button> */}
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
  );
}
