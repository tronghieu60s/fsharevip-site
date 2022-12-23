import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { FormEvent, useCallback, useState } from "react";
import { Key } from "react-feather";
import { delayLoading } from "../../core/commonFuncs";

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <h5 className="font-medium leading-tight text-xl">Đổi Mật Khẩu</h5>
      <div className="mt-2">
        <div className="text-base mb-1.5 block">
          <Label htmlFor="email" value="Mật khẩu cũ" />
        </div>
        <TextInput
          type="password"
          name="OldPassword"
          required={true}
          addon={<Key size={15} />}
          placeholder="Mật khẩu cũ"
        />
        <div className="text-base mt-3 mb-1.5 block">
          <Label htmlFor="password" value="Mật khẩu mới" />
        </div>
        <TextInput
          type="password"
          name="NewPassword"
          required={true}
          addon={<Key size={15} />}
          placeholder="Mật khẩu mới"
        />
        <div className="text-base mt-3 mb-1.5 block">
          <Label htmlFor="password" value="Nhập lại mật khẩu mới" />
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
            {loading && (
              <div className="mr-3">
                <Spinner size="sm" light={true} />
              </div>
            )}
            Đổi Mật Khẩu
          </Button>
        </div>
      </div>
    </form>
  );
}
