import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
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
import { delayLoading } from "../../core/commonFuncs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../service/auth/auth.reducer";

const getMappingUser = (user: any) => {
  const {
    uid,
    email,
    photoURL,
    phoneNumber,
    isAnonymous,
    emailVerified,
    displayName,
    accessToken,
  } = user;

  return {
    user: {
      uid,
      email,
      photoURL,
      phoneNumber,
      isAnonymous,
      emailVerified,
      displayName,
    },
    accessToken,
  };
};

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const setAuth = useSetRecoilState(authState);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    await delayLoading();

    const { Email, Password } = e.target as any;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, Email.value, Password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        setAuth(getMappingUser(user));
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        console.log(errorCode);
        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/wrong-password"
        ) {
          toast.error("Tài khoản hoặc mật khẩu không đúng.");
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
            <Link href="/sign-up" className="text-blue-600">
              Đăng Ký
            </Link>
            .
          </p>
        </form>
      </Card>
    </div>
  );
}
