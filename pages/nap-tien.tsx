import { Avatar, Card, ListGroup } from "flowbite-react";
import md5 from "md5";
import Image from "next/image";
import React from "react";

export default function PayIn() {
  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col justify-center items-center">
          <Avatar
            img={`https://www.gravatar.com/avatar/${md5(
              "tronghieu60s@gmail.com"
            )}`}
            size="lg"
            rounded={true}
          />
          <h5 className="font-medium leading-tight text-xl mt-4 mb-2">
            Trọng Hiếu
          </h5>
          <span className="text-blue-500 text-sm">
            <a href="https://gravatar.com/" target="_blank" rel="noreferrer">
              Ảnh đại diện Gravatar
            </a>
          </span>
          <span className="text-orange-500 text-sm mt-3">
            <a href="https://gravatar.com/" target="_blank" rel="noreferrer">
              Đổi Mật Khẩu
            </a>
          </span>
          <span className="text-orange-500 text-sm mt-3">
            <a href="https://gravatar.com/" target="_blank" rel="noreferrer">
              Mua Lượt Tải Fshare
            </a>
          </span>
        </div>
        <div className="col-span-3">
          <h5 className="font-medium leading-tight text-xl mt-0">Thanh Toán</h5>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="col-span-1">
              <ListGroup>
                <ListGroup.Item>Momo</ListGroup.Item>
                <ListGroup.Item>Thẻ Cào</ListGroup.Item>
                <ListGroup.Item>Ngân Hàng</ListGroup.Item>
              </ListGroup>
            </div>
            <div className="col-span-1">
              <ListGroup>
                <ListGroup.Item>
                  <span className="text-blue-500 mr-1">2 lượt tải</span>
                  {" ― "}5.000đ
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="text-blue-600 mr-1">4 lượt tải</span>
                  {" ― "}10.000đ
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="text-blue-700 mr-1">10 lượt tải</span>
                  {" ― "}20.000đ
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="text-red-500 mr-1">20 lượt tải</span>
                  {" ― "}35.000đ
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="text-red-600 mr-1">50 lượt tải</span>
                  {" ― "}80.000đ
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
