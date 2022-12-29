import { User } from "firebase/auth";
import {
  limitToLast,
  off,
  onValue,
  query,
  ref,
  remove,
} from "firebase/database";
import { Badge, Button, Modal, Spinner, Table, Tooltip } from "flowbite-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Info, XCircle } from "react-feather";
import toast from "react-hot-toast";
import NoSSR from "react-no-ssr";
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ORDER_DELETE_SUCCESS,
} from "../../const/message";
import { convertObjectToArray } from "../../core/commonFuncs";
import { firebaseCheckAuth } from "../../utils/firebase/firebaseAuth";
import { database } from "../../utils/firebase/firebaseConfig";
import Segmented from "../common/Base/Segmented";

export default function HistoryPayment() {
  const [isShowModal, setIsShowModal] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const user = currentUser?.uid;

  const [orderSelected, setOrderSelected] = useState({} as any);
  const [paymentInformation, setPaymentInformation] = useState({} as any);

  useEffect(() => {
    firebaseCheckAuth((user) => setCurrentUser(user));
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const ordersRef = ref(database, `Orders/${user}`);
    const ordersQuery = query(ordersRef, limitToLast(10));
    onValue(ordersQuery, (snapshot) => {
      const data = snapshot.val();
      const tableData = convertObjectToArray(data)?.reverse() as any;
      setTableData(tableData);
    });

    return () => off(ordersQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSelectItem = useCallback((item: any) => {
    setOrderSelected(item);
    setPaymentInformation(item.PaymentInformation);
    setIsShowModal(true);
  }, []);

  const onDeleteItem = useCallback(
    (key: string) => {
      try {
        const ordersRef = ref(database, `Orders/${user}/${key}`);
        remove(ordersRef).then(() => {
          toast.success(MESSAGE_ORDER_DELETE_SUCCESS);
        });
      } catch (error) {
        return toast.error(MESSAGE_INTERNAL_SERVER_ERROR);
      }
    },
    [user]
  );

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4">
        <Segmented />
      </div>
      <div className="col-span-4">
        <h5 className="font-medium leading-tight text-xl">Lịch Sử Giao Dịch</h5>
        <div className="text-xs text-current mt-2">
          * Hiển thị 10 giao dịch gần nhất.
        </div>
        <Table hoverable={true} className="mt-2">
          <Table.Head>
            <Table.HeadCell>STT</Table.HeadCell>
            <Table.HeadCell>PT Thanh Toán</Table.HeadCell>
            <Table.HeadCell>Thanh Toán</Table.HeadCell>
            <Table.HeadCell>Point Nhận Được</Table.HeadCell>
            <Table.HeadCell>ND Chuyển Khoản</Table.HeadCell>
            <Table.HeadCell>Trạng Thái</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {tableData?.map((item: any, index: number) => (
              <Table.Row
                key={item.key}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  {item.Status === "Pending" && (
                    <span className="mr-2">
                      <Spinner size="xs" light={true} />
                    </span>
                  )}
                  {item.Method}
                  <br />
                  {item.MethodDetail}
                </Table.Cell>
                <Table.Cell>
                  <div className="font-semibold text-blue-500">
                    {item.Price?.toLocaleString()} vnđ
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="font-semibold text-red-500">
                    {item.Point} Point
                  </div>
                </Table.Cell>
                <Table.Cell>{item.TransferContent}</Table.Cell>
                <Table.Cell>
                  <Badge
                    color={item.Status === "Pending" ? "warning" : "success"}
                  >
                    {item.Status}
                  </Badge>
                  <div>{new Date(item.Date).toLocaleString()}</div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <NoSSR>
                      {item.Status === "Pending" && (
                        <React.Fragment>
                          <Tooltip content="Thông Tin Chuyển Khoản">
                            <Button
                              size="xs"
                              onClick={() => onSelectItem(item)}
                              className="mr-1"
                            >
                              <Info size={15} />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Hủy">
                            <Button
                              size="xs"
                              onClick={() => onDeleteItem(item.key)}
                            >
                              <XCircle size={15} />
                            </Button>
                          </Tooltip>
                        </React.Fragment>
                      )}
                    </NoSSR>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Modal show={isShowModal}>
          <Modal.Body>
            <div className="flex flex-col items-center">
              <div
                className="relative w-64 h-64"
                hidden={!paymentInformation?.accountImage}
              >
                <Image
                  fill
                  alt={paymentInformation?.accountName || "Image Payment"}
                  src={paymentInformation?.accountImage}
                />
              </div>
              <div className="mt-2">{paymentInformation?.accountNumber}</div>
              <div className="mt-2">
                <span className="uppercase">
                  {paymentInformation?.accountName}
                </span>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
