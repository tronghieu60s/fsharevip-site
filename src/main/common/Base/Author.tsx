import { User } from "firebase/auth";
import { Avatar } from "flowbite-react";
import md5 from "md5";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { firebaseCheckAuth } from "../../../utils/firebase/firebaseAuth";

export default function Author() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    firebaseCheckAuth((user) => setCurrentUser(user));
  }, []);

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
    <div className="flex flex-col items-center">
      <Avatar img={avatar} size="lg" rounded={true} />
      <Link href="/ho-so">
        <h5 className="font-medium leading-tight text-xl mt-4 mb-2">
          {displayName}
        </h5>
      </Link>
      <span className="text-blue-500 text-sm">
        <Link href="https://gravatar.com/" target="_blank">
          Ảnh đại diện Gravatar
        </Link>
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
