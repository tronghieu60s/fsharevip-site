import { User } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
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

    const ordersRef = ref(database, `/Orders/${user}`);
    onValue(ordersRef, async (snapshot) => {
      const data = snapshot.val();
      setTableData(convertObjectToArray(data) as any);
    });
  }, [user]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4">
        <Segmented />
      </div>
      <div className="col-span-4">
        <h5 className="font-medium leading-tight text-xl">Lịch Sử Giao Dịch</h5>
        <Table hoverable={true} className="mt-2">
          <Table.Head>
            <Table.HeadCell>Phương Thức</Table.HeadCell>
            <Table.HeadCell>Phương Thức Chi Tiết</Table.HeadCell>
            <Table.HeadCell>Thanh Toán</Table.HeadCell>
            <Table.HeadCell>Point Nhận Được</Table.HeadCell>
            <Table.HeadCell>Trạng Thái</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">

              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <a
                  href="/tables"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
