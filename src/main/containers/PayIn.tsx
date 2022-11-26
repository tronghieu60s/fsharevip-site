import { Button, ListGroup, TextInput } from "flowbite-react";
import Image from "next/image";

export default function PayIn() {
  return (
    <div>
      <div className="text-sm mb-4">
        Point Còn Lại: <span className="text-red-600">30 point</span>
        <div className="text-xs text-current mt-1">* 1 point = 1 lượt tải</div>
        <div className="text-xs text-current mt-1">
          * Thời hạn sử dụng lượt tải là <strong>Vĩnh Viễn</strong>.
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <h5 className="font-medium leading-tight text-xl">Bảng Giá</h5>
          <ListGroup className="mt-2">
            <ListGroup.Item>
              <span className="text-blue-500 mr-1">2 point</span>
              {" ― "}5.000đ
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="text-blue-600 mr-1">4 point</span>
              {" ― "}10.000đ
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="text-blue-700 mr-1">10 point</span>
              {" ― "}20.000đ
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="text-red-500 mr-1">18 point</span>
              {" ― "}30.000đ
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="text-red-600 mr-1">50 point</span>
              {" ― "}80.000đ
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className="col-span-3">
          <h5 className="font-medium leading-tight text-xl">Thanh Toán</h5>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="col-span-1">
              <ListGroup>
                <ListGroup.Item>
                  <Image
                    src="/assets/momo.png"
                    alt=""
                    width={25}
                    height={25}
                    className="mr-2"
                  />
                  Momo
                </ListGroup.Item>
                <ListGroup.Item>
                  <Image
                    src="/assets/card.png"
                    alt="Card"
                    width={25}
                    height={25}
                    className="mr-2"
                  />
                  Thẻ Cào
                </ListGroup.Item>
                <ListGroup.Item>
                  <Image
                    src="/assets/debit.png"
                    alt="Debit"
                    width={25}
                    height={25}
                    className="mr-2"
                  />
                  Ngân Hàng
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className="col-span-2">
              {/* <ListGroup>
                <ListGroup.Item>
                  <Image
                    src="/assets/qr.png"
                    alt=""
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Momo QR
                </ListGroup.Item>
              </ListGroup> */}
              <ListGroup>
                <ListGroup.Item>
                  <Image
                    src="/assets/viettel.png"
                    alt=""
                    width={50}
                    height={50}
                    className="mr-2"
                  />
                  Viettel
                </ListGroup.Item>
                <ListGroup.Item>
                  <Image
                    src="/assets/mobifone.png"
                    alt=""
                    width={50}
                    height={50}
                    className="mr-2"
                  />
                  Mobifone
                </ListGroup.Item>
                <ListGroup.Item>
                  <Image
                    src="/assets/vinaphone.png"
                    alt=""
                    width={50}
                    height={50}
                    className="mr-2"
                  />
                  Vinaphone
                </ListGroup.Item>
              </ListGroup>
              {/* <ListGroup>
                  <ListGroup.Item>
                    <Image
                      src="/assets/banks/agribank.png"
                      alt=""
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    Agribank - NH Nông Nghiệp và PT Nông Thôn VN
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Image
                      src="/assets/banks/eximbank.png"
                      alt=""
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    Eximbank - NH Xuất Nhập Khẩu VN
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Image
                      src="/assets/banks/hdbank.png"
                      alt=""
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    HDBank - NH Thương Mại CP Phát Triển TPHCM
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Image
                      src="/assets/banks/maritimebank.png"
                      alt=""
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    MaritimeBank - NH Thương Mại CP Hàng Hải VN
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Image
                      src="/assets/banks/mbbank.png"
                      alt=""
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    MBBank - NH Quân Đội
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Image
                      src="/assets/banks/sacombank.png"
                      alt=""
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    Sacombank - NH Thương Mại CP Thương Tín
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Image
                      src="/assets/banks/techcombank.png"
                      alt=""
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    Techcombank - NH Thương Mại CP Kỹ Thương VN
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Image
                      src="/assets/banks/vibbank.png"
                      alt=""
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    VIBBank - NH Thương Mại CP Quốc Tế VN
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Image
                      src="/assets/banks/vietcombank.png"
                      alt=""
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    Vietcombank - NH Thương Mại CP Ngoại thương VN
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Image
                      src="/assets/banks/vietinbank.png"
                      alt=""
                      width={50}
                      height={50}
                      className="mr-2"
                    />
                    Vietinbank - NH Thương Mại CP Công Thương VN
                  </ListGroup.Item>
                </ListGroup> */}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Mã Giảm Giá (nếu có)
          </label>
          <TextInput />
          <small className="text-xs text-current">
            * Khi nạp dư, số tiền còn lại sẽ được giữ lại và sử dụng trong lần
            nạp kế tiếp.
          </small>
          <Button className="mt-2">Thanh Toán</Button>
        </div>
      </div>
    </div>
  );
}
