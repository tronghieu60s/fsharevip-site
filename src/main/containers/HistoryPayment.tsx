import { User } from "firebase/auth";
import {
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import { Badge, Button, Spinner, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import NoSSR from "react-no-ssr";
import { convertObjectToArray } from "../../core/commonFuncs";
import { firebaseCheckAuth } from "../../utils/firebase/firebaseAuth";
import { database } from "../../utils/firebase/firebaseConfig";
import Segmented from "../common/Base/Segmented";

export default function HistoryPayment() {
  const [tableData, setTableData] = useState([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const user = currentUser?.uid;

  useEffect(() => {
    firebaseCheckAuth((user) => setCurrentUser(user));
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const recentOrdersRef = query(
      ref(database, `Orders/${user}`),
      orderByChild("Date"),
      limitToLast(20)
    );
    onValue(recentOrdersRef, async (snapshot) => {
      const data = snapshot.val();
      setTableData(convertObjectToArray(data)?.reverse() as any);
    });
  }, [user]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4">
        <Segmented />
      </div>
      <div className="col-span-4">
        <h5 className="font-medium leading-tight text-xl">Lịch Sử Giao Dịch</h5>
        <div className="text-xs text-current mt-2">
          * Hiển thị 20 giao dịch gần nhất.
        </div>
        <Table hoverable={true} className="mt-2">
          <Table.Head>
            <Table.HeadCell>Mã Giao Dịch</Table.HeadCell>
            <Table.HeadCell>Phương Thức Thanh Toán</Table.HeadCell>
            <Table.HeadCell>Thanh Toán</Table.HeadCell>
            <Table.HeadCell>Point Nhận Được</Table.HeadCell>
            <Table.HeadCell>Trạng Thái</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {tableData?.map((item: any) => (
              <Table.Row
                key={item.key}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{item.key}</Table.Cell>
                <Table.Cell>
                  {item.Method} - {item.MethodDetail}
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
                <Table.Cell>
                  <Badge
                    color={item.Status === "Pending" ? "warning" : "success"}
                  >
                    {item.Status === "Pending" && (
                      <span className="mr-2">
                        <Spinner size="xs" light={true} />
                      </span>
                    )}
                    {item.Status}
                  </Badge>
                  <div>{new Date(item.Date).toLocaleString()}</div>
                </Table.Cell>
                <Table.Cell>
                  <NoSSR>
                    {item.Status === "Pending" && (
                      <Button size="xs">Hủy</Button>
                    )}
                  </NoSSR>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
