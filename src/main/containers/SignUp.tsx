import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import Link from "next/link";
import { FormEvent, useCallback, useState } from "react";
import { Key, User } from "react-feather";
import toast from "react-hot-toast";
import {
  MESSAGE_AUTH_EMAIL_EXIST,
  MESSAGE_AUTH_PASSWORD_NOT_MATCH,
  MESSAGE_AUTH_PASSWORD_WEAK,
  MESSAGE_AUTH_SIGN_UP_SUCCESS
} from "../../const/message";
import { firebaseSignUpUser } from "../../utils/firebase/firebaseAuth";

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const { Email, Password, RePassword } = e.target as any;

    if (Password.value !== RePassword.value) {
      toast.error(MESSAGE_AUTH_PASSWORD_NOT_MATCH);
      return setLoading(false);
    }

    firebaseSignUpUser(Email.value, Password.value)
      .then(() => toast.success(MESSAGE_AUTH_SIGN_UP_SUCCESS))
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/weak-password") {
          return toast.error(MESSAGE_AUTH_PASSWORD_WEAK);
        }
        if (errorCode === "auth/email-already-in-use") {
          return toast.error(MESSAGE_AUTH_EMAIL_EXIST);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="sm:w-full md:w-full lg:w-2/5 mx-auto mt-5">
      <Card>
        <form onSubmit={onSubmit}>
          <h5 className="text-lg text-center font-bold capitalize">Đăng ký</h5>
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
            <Label htmlFor="password" value="Mật khẩu" />
          </div>
          <TextInput
            type="password"
            name="Password"
            required={true}
            addon={<Key size={15} />}
            placeholder="Mật khẩu"
          />
          <div className="text-base mt-3 mb-1.5 block">
            <Label htmlFor="RePassword" value="Nhập lại mật khẩu" />
          </div>
          <TextInput
            type="password"
            name="RePassword"
            required={true}
            addon={<Key size={15} />}
            placeholder="Mật khẩu xác nhận"
          />
          <div className="flex items-center gap-2 mt-3">
            <Label htmlFor="agree">
              Bằng cách nhấn nút đăng ký bạn đồng ý với{" "}
              <a
                href="/forms"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                điều khoản và điều kiện
              </a>{" "}
              của chúng tôi.
            </Label>
          </div>
          <div className="w-full mt-3">
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
              Đăng Ký
            </Button>
          </div>
          <p className="text-sm mt-2">
            Bạn đã có tài khoản? Hãy{" "}
            <Link href="/sign-in" className="text-blue-600">
              Đăng Nhập
            </Link>
            .
          </p>
        </form>
      </Card>
    </div>
  );
}
