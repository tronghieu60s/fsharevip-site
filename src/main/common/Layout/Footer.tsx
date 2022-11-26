import React from "react";
import { Footer as DefaultFooter } from "flowbite-react";

export default function Footer() {
  return (
    <DefaultFooter
      id="footer"
      container={true}
      className="bg-transparent shadow-none mt-5"
    >
      <DefaultFooter.Copyright href="#" by="Flowbite™" year={2022} />
      <DefaultFooter.LinkGroup>
        <DefaultFooter.Link href="#">Giới Thiệu</DefaultFooter.Link>
        <DefaultFooter.Link href="#">Quảng Cáo</DefaultFooter.Link>
        <DefaultFooter.Link href="#">Chính Sách Bảo Mật</DefaultFooter.Link>
        <DefaultFooter.Link href="#">Liên Hệ</DefaultFooter.Link>
      </DefaultFooter.LinkGroup>
    </DefaultFooter>
  );
}
