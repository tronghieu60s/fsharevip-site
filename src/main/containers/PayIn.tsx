import { User } from "firebase/auth";
import {
  push,
  ref,
  set,
  child,
  update,
  onValue,
  increment,
} from "firebase/database";
import { Button, ListGroup, Modal, Spinner, TextInput } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ORDER_PAYMENT_SUCCESS,
  MESSAGE_ORDER_PROCESS_SUCCESS,
  MESSAGE_ORDER_REQUIRE_SUCCESS,
} from "../../const/message";
import { PAY_IN_METHOD, PAY_IN_PRICE } from "../../const/payIn";
import { firebaseCheckAuth } from "../../utils/firebase/firebaseAuth";
import { database } from "../../utils/firebase/firebaseConfig";

const prices = PAY_IN_PRICE;
const methods = PAY_IN_METHOD;

export default function PayIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const [orderKey, setOrderKey] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPoint, setCurrentPoint] = useState(0);
  const user = currentUser?.uid;

  const [price, setPrice] = useState("");
  const [method, setMethod] = useState("");
  const [methodDetail, setMethodDetail] = useState("");
  const [paymentInformation, setPaymentInformation] = useState({} as any);
  const [transferContent, setTransferContent] = useState("");

  const methodsDetail = useMemo(
    () => methods?.find((item) => item.key === method)?.methods || [],
    [method]
  );

  const priceSelected = useMemo(
    () => prices?.find((item) => item.key === price) || ({} as any),
    [price]
  );
  const methodSelected = useMemo(
    () => methods?.find((item) => item.key === method) || ({} as any),
    [method]
  );
  const methodDetailSelected = useMemo(
    () =>
      [...methodsDetail]?.find((item) => item.key === methodDetail) ||
      ({} as any),
    [methodDetail, methodsDetail]
  );

  const isSubmitDisabled = useMemo(
    () => !price || !method || !methodDetail || loading,
    [price, method, methodDetail, loading]
  );

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

  const onOrderSuccess = useCallback(async () => {
    if (!user || !orderKey) {
      return;
    }

    const updates = {} as any;
    updates[`/Users/${user}/Point`] = increment(priceSelected?.point || 0);
    return update(ref(database), updates);
  }, [orderKey, priceSelected?.point, user]);

  useEffect(() => {
    if (!user || !orderKey) {
      return;
    }

    onValue(ref(database, `/Orders/${user}/${orderKey}`), async (snapshot) => {
      const data = snapshot.val();
      if (data?.Status !== "Success") {
        return;
      }

      await toast
        .promise(onOrderSuccess(), {
          loading: MESSAGE_ORDER_PROCESS_SUCCESS,
          success: MESSAGE_ORDER_PAYMENT_SUCCESS,
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        })
        .finally(() => {
          const timeout = setTimeout(() => {
            clearTimeout(timeout);
            router.push("/lich-su-giao-dich");
          }, 1000);
        });
    });
  }, [onOrderSuccess, orderKey, router, user]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!user || isSubmitDisabled) {
        return;
      }

      setLoading(true);
      setPaymentInformation(methodDetailSelected?.information || {});

      const transferContent = crypto.randomUUID().replace(/-/g, "").toUpperCase().slice(0, 10);
      setTransferContent(transferContent);

      const orderData = {
        Date: Date.now(),
        Expired: Date.now() + 86400000 * 5, // 5 days
        Price: priceSelected?.price,
        Point: priceSelected?.point,
        Method: methodSelected?.name,
        MethodDetail: methodDetailSelected?.name,
        TransferContent: transferContent,
        Status: "Pending",
      };
      try {
        const orderKey = push(child(ref(database), "posts")).key;
        if (!orderKey) {
          throw new Error("OrderKey is null");
        }

        set(ref(database, `/Orders/${user}/${orderKey}`), orderData);
        setOrderKey(orderKey);

        toast.success(MESSAGE_ORDER_REQUIRE_SUCCESS);
        setIsShowModal(true);
      } catch (error) {
        return toast.error(MESSAGE_INTERNAL_SERVER_ERROR);
      }
    },
    [
      isSubmitDisabled,
      methodDetailSelected?.information,
      methodDetailSelected?.name,
      methodSelected?.name,
      priceSelected?.point,
      priceSelected?.price,
      user,
    ]
  );

  const onUsingCoupon = useCallback(() => {}, []);

  const onPendingPayment = useCallback(() => {
    setIsShowModal(false);
  }, []);

  const onCompletePayment = useCallback(() => {
    setLoading(false);
    router.push("/lich-su-giao-dich");
  }, [router]);

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <div className="text-sm mb-4">
          Point Còn Lại:{" "}
          <span className="font-semibold text-red-600">
            {currentPoint} point
          </span>
          <div className="text-xs text-current mt-1">
            * 1 point = 1 lượt tải
          </div>
          <div className="text-xs text-current mt-1">
            * Thời hạn sử dụng lượt tải là <strong>Vĩnh Viễn</strong>.
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <h5 className="font-medium leading-tight text-xl">Bảng Giá</h5>
            <ListGroup className="mt-2">
              {prices?.map((item) => (
                <ListGroup.Item
                  key={item.point}
                  active={price === item.key}
                  onClick={() => setPrice(item.key)}
                >
                  <div className="flex items-center h-7">
                    <span className={`text-${item.color} mr-1`}>
                      {item.point} point
                    </span>
                    {" ― "}
                    {item.price?.toLocaleString()} vnđ
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="col-span-3">
            <h5 className="font-medium leading-tight text-xl">Thanh Toán</h5>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="col-span-1">
                <ListGroup>
                  {methods.map((item) => (
                    <ListGroup.Item
                      key={item.key}
                      active={method === item.key}
                      onClick={() => {
                        setMethod(item.key);
                        setMethodDetail("");
                      }}
                    >
                      <div className="flex items-center h-7">
                        <div className="relative mr-2 w-7 h-7">
                          <Image fill src={item.image} alt={item.name} />
                        </div>
                        {item.name}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
              <div className="col-span-2" hidden={!method}>
                <ListGroup>
                  {methodsDetail?.map((item) => (
                    <ListGroup.Item
                      key={item.key}
                      active={methodDetail === item.key}
                      onClick={() => setMethodDetail(item.key)}
                    >
                      <div className="flex items-center h-7">
                        <div className="relative mr-2 w-7 h-7">
                          <Image fill src={item.image} alt={item.name} />
                        </div>
                        {item.name}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mã Giảm Giá (nếu có):
            </label>
            <div className="flex w-full">
              <TextInput className="w-full items-center" />
              <Button className="w-40 ml-2" onClick={onUsingCoupon}>
                Áp Dụng
              </Button>
            </div>
            <small className="text-xs text-current">
              * Khi nạp dư, số tiền còn lại sẽ được giữ lại và sử dụng trong lần
              nạp kế tiếp. <br />* Thanh toán thành công chậm nhất là{" "}
              <span className="font-semibold text-red-600">
                30 phút (8h - 22h)
              </span>
              . Ngoài thời gian này, thanh toán sẽ hoàn tất vào ngày hôm sau.
            </small>
          </div>
          <div className="col-span-4" hidden={isSubmitDisabled}>
            <div className="text-current">
              Tổng Thanh Toán:{" "}
              <span className="font-bold">
                {priceSelected.price?.toLocaleString()} vnđ
              </span>
            </div>
            <div className="text-current">
              Phương Thức Thanh Toán:{" "}
              <span className="font-bold">{methodDetailSelected?.name}</span>
            </div>
          </div>
        </div>
        <Button type="submit" className="w-52 mt-5" disabled={isSubmitDisabled}>
          {loading && (
            <div className="mr-3">
              <Spinner size="sm" light={true} />
            </div>
          )}
          {loading ? "Đang Xử Lý" : "Thanh Toán"}
        </Button>
      </form>
      <Modal show={isShowModal} onClose={onPendingPayment}>
        <Modal.Body>
          <div className="flex flex-col items-center">
            <div
              className="relative w-64 h-64"
              hidden={!paymentInformation?.accountImage}
            >
              <Image
                fill
                alt={paymentInformation?.accountName || "Image Payment"}
                src={paymentInformation?.accountImage}
              />
            </div>
            <div className="mt-2">{paymentInformation?.accountNumber}</div>
            <div className="mt-2">
              <span className="uppercase">
                {paymentInformation?.accountName}
              </span>
            </div>
            <div className="mt-2">
              Nội Dung Chuyển Khoản: <strong>{transferContent}</strong>
            </div>
            <div className="text-xs text-current mt-4">
              * {paymentInformation?.accountDescription}
              <br />* Chuyển số tiền{" "}
              <strong>
                {prices
                  .find((item) => item.key === price)
                  ?.price?.toLocaleString()}
                đ
              </strong>{" "}
              vào tài khoản <strong>{paymentInformation?.accountNumber}</strong>{" "}
              với nội dung <strong>{transferContent}</strong>.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={onPendingPayment}>
            Chưa Hoàn Thành
          </Button>
          <Button onClick={onCompletePayment}>Đã Hoàn Thành</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
