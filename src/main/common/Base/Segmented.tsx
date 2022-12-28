import { Button } from "flowbite-react";
import Link from "next/link";

export default function Segmented() {
  return (
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
  );
}
