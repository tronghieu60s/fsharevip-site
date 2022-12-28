import { User } from "firebase/auth";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { Key, User as UserLogo } from "react-feather";
import { toast } from "react-hot-toast";
import {
  MESSAGE_AUTH_PASSWORD_NOT_MATCH,
  MESSAGE_AUTH_PASSWORD_OLD_NOT_MATCH,
  MESSAGE_AUTH_PASSWORD_PROMPT,
  MESSAGE_AUTH_UPDATE_PASSWORD_SUCCESS,
  MESSAGE_AUTH_UPDATE_PROFILE_SUCCESS,
} from "../../const/message";
import {
  firebaseCheckAuth,
  firebaseUpdatePassword,
  firebaseUpdateProfile,
} from "../../utils/firebase/firebaseAuth";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [loadingUP, setLoadingUP] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const displayName = currentUser?.displayName || '';

  useEffect(() => {
    firebaseCheckAuth((user) => setCurrentUser(user));
  }, []);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const { DisplayName } = e.target as HTMLFormElement;

    firebaseUpdateProfile({ displayName: DisplayName.value })
      .then(() => toast.success(MESSAGE_AUTH_UPDATE_PROFILE_SUCCESS))
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
          return toast.error(MESSAGE_AUTH_PASSWORD_OLD_NOT_MATCH);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmitUpdatePassword = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setLoadingUP(true);
      const { OldPassword, NewPassword, ReNewPassword } =
        e.target as HTMLFormElement;

      if (NewPassword.value !== ReNewPassword.value) {
        toast.error(MESSAGE_AUTH_PASSWORD_NOT_MATCH);
        return setLoadingUP(false);
      }

      firebaseUpdatePassword(OldPassword.value, NewPassword.value)
        .then(() => {
          (e.target as HTMLFormElement).reset();
          toast.success(MESSAGE_AUTH_UPDATE_PASSWORD_SUCCESS);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/wrong-password") {
            return toast.error(MESSAGE_AUTH_PASSWORD_OLD_NOT_MATCH);
          }
        })
        .finally(() => setLoadingUP(false));
    },
    []
  );

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <h5 className="font-medium leading-tight text-xl">Hồ Sơ</h5>
        <div className="mt-2">
          <div className="text-base mb-1.5 block">
            <Label htmlFor="DisplayName" value="Tên hiển thị" />
          </div>
          <TextInput
            type="text"
            name="DisplayName"
            required={true}
            addon={<UserLogo size={15} />}
            placeholder="Tên hiển thị"
            defaultValue={displayName}
          />
          <div className="w-full mt-4">
            <Button type="submit" className="capitalize">
              {loading && (
                <div className="mr-3">
                  <Spinner size="sm" light={true} />
                </div>
              )}
              Cập Nhật Hồ Sơ
            </Button>
          </div>
        </div>
      </form>
      <form onSubmit={onSubmitUpdatePassword} className="mt-5">
        <h5 className="font-medium leading-tight text-xl">Đổi Mật Khẩu</h5>
        <div className="mt-2">
          <div className="text-base mb-1.5 block">
            <Label htmlFor="OldPassword" value="Mật khẩu cũ" />
          </div>
          <TextInput
            type="password"
            name="OldPassword"
            required={true}
            addon={<Key size={15} />}
            placeholder="Mật khẩu cũ"
          />
          <div className="text-base mt-3 mb-1.5 block">
            <Label htmlFor="NewPassword" value="Mật khẩu mới" />
          </div>
          <TextInput
            type="password"
            name="NewPassword"
            required={true}
            addon={<Key size={15} />}
            placeholder="Mật khẩu mới"
          />
          <div className="text-base mt-3 mb-1.5 block">
            <Label htmlFor="ReNewPassword" value="Nhập lại mật khẩu mới" />
          </div>
          <TextInput
            type="password"
            name="ReNewPassword"
            required={true}
            addon={<Key size={15} />}
            placeholder="Nhập lại mật khẩu mới"
          />
          <div className="w-full mt-4">
            <Button type="submit" className="capitalize">
              {loadingUP && (
                <div className="mr-3">
                  <Spinner size="sm" light={true} />
                </div>
              )}
              Cập Nhật Mật Khẩu
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}
