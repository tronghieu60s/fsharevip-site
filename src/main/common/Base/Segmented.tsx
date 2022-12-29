import { User } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { firebaseCheckAuth } from "../../../utils/firebase/firebaseAuth";
import { database } from "../../../utils/firebase/firebaseConfig";

export default function Segmented() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPoint, setCurrentPoint] = useState(0);
  const user = currentUser?.uid;

  useEffect(() => {
    firebaseCheckAuth((user) => setCurrentUser(user));
  }, []);
  
  useEffect(() => {
    if (!user) {
      return;
    }

    const userRef = ref(database, `/Users/${user}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentPoint(data?.Point || 0);
    });
  }, [user]);

  return (
    <div>
      <div className="text-sm mb-4">
        Point Còn Lại:{" "}
        <span className="font-semibold text-red-600">{currentPoint} point</span>
        <div className="text-xs text-current mt-1">* 1 point = 1 lượt tải</div>
        <div className="text-xs text-current mt-1">
          * Thời hạn sử dụng lượt tải là <strong>Vĩnh Viễn</strong>.
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="/lich-su-giao-dich">
          <Button size="sm" gradientDuoTone="purpleToBlue">
            Lịch Sử Giao Dịch
          </Button>
        </Link>
        <Link href="/lich-su-tai-xuong">
          <Button size="sm" gradientDuoTone="purpleToBlue">
            Lịch Sử Tải Xuống
          </Button>
        </Link>
      </div>
    </div>
  );
}
