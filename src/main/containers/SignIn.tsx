import {
  Button,
  Card,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { Key, User } from "react-feather";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="sm:w-full md:w-full lg:w-2/5 mx-auto mt-5">
      <Card>
        <form>
          <h5 className="text-lg text-center font-bold capitalize">
            Đăng nhập
          </h5>
          <div className="text-base mb-1.5 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            type="email"
            name="Email"
            required={true}
            addon={<User size={15} />}
            placeholder="Email"
          />
          <div className="text-base mt-3 mb-1.5 block">
            <Label htmlFor="password" value="Mật khẩu" />
          </div>
          <TextInput
            type="password"
            name="Password"
            required={true}
            addon={<Key size={15} />}
            placeholder="Mật khẩu"
          />
          <div className="flex items-center gap-2 mt-4">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Duy trì đăng nhập</Label>
          </div>
          <div className="w-full mt-4">
            <Button
              type="submit"
              className="capitalize"
              style={{ width: "100%" }}
            >
              {loading && (
                <div className="mr-3">
                  <Spinner size="sm" light={true} />
                </div>
              )}
              Đăng Nhập
            </Button>
          </div>
          <p className="text-sm mt-2">
            Bạn chưa có tài khoản? Hãy{" "}
            <Link href="/dang-ky" className="text-blue-600">
              Đăng Ký
            </Link>
            .
          </p>
        </form>
      </Card>
    </div>
  );
}
