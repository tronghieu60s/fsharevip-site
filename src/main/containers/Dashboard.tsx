import { Button } from "flowbite-react";
import React from "react";

export default function Dashboard() {
  return (
    <div className="flex gap-4">
      <Button size="sm" gradientDuoTone="purpleToBlue">
        Lịch Sử Giao Dịch
      </Button>
      <Button size="sm" gradientDuoTone="purpleToBlue">
        Lịch Sử Tải Xuống
      </Button>
    </div>
  );
}
