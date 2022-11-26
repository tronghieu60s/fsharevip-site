import { Avatar } from "flowbite-react";
import md5 from "md5";
import Link from "next/link";
import React from "react";

export default function Author() {
  return (
    <div className="flex flex-col items-center">
      <Avatar
        img={`https://www.gravatar.com/avatar/${md5("tronghieu60s@gmail.com")}`}
        size="lg"
        rounded={true}
      />
      <h5 className="font-medium leading-tight text-xl mt-4 mb-2">
        Trọng Hiếu
      </h5>
      <span className="text-blue-500 text-sm">
        <Link href="https://gravatar.com/" target="_blank">
          Ảnh đại diện Gravatar
        </Link>
      </span>
      <span className="text-orange-500 text-sm mt-3">
        <Link href="/doi-mat-khau">Đổi Mật Khẩu</Link>
      </span>
      <span className="text-orange-500 text-sm mt-3">
        <Link href="/thong-ke">Thống Kê</Link>
      </span>
      <span className="text-orange-500 text-sm mt-3">
        <Link href="/mua-luot-tai">Mua Lượt Tải Fshare</Link>
      </span>
      <span className="text-orange-500 text-sm font-bold mt-3">
        <Link href="/su-dung-luot-tai">Sử Dụng Lượt Tải Fshare</Link>
      </span>
    </div>
  );
}
