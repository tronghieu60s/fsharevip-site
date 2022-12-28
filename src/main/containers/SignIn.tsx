import { captureException } from "@sentry/nextjs";
import {
  Button,
  Card,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { Key, User } from "react-feather";
import toast from "react-hot-toast";
import {
  MESSAGE_AUTH_ACCOUNT_INVALID,
  MESSAGE_AUTH_SIGN_IN_SUCCESS,
} from "../../const/message";
import { firebaseSignInUser } from "../../utils/firebase/firebaseAuth";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const { Email, Password } = e.target as any;

    firebaseSignInUser(Email.value, Password.value)
      .then(() => toast.success(MESSAGE_AUTH_SIGN_IN_SUCCESS))
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/wrong-password"
        ) {
          return toast.error(MESSAGE_AUTH_ACCOUNT_INVALID);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="sm:w-full md:w-full lg:w-2/5 mx-auto mt-5">
      <Card>
        <form onSubmit={onSubmit}>
          <h5 className="text-lg text-center font-bold capitalize">
            Đăng nhập
          </h5>
          <div className="text-base mb-1.5 block">
            <Label htmlFor="Email" value="Email" />
          </div>
          <TextInput
            type="email"
            name="Email"
            required={true}
            addon={<User size={15} />}
            placeholder="Email"
          />
          <div className="text-base mt-3 mb-1.5 block">
            <Label htmlFor="Password" value="Mật khẩu" />
          </div>
          <TextInput
            type="password"
            name="Password"
            required={true}
            addon={<Key size={15} />}
            placeholder="Mật khẩu"
          />
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
              đăng ký
            </Link>
            .
          </p>
        </form>
      </Card>
    </div>
  );
}
