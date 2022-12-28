export const PAY_IN_STATUS = {
  CREATED: "CREATED",
  SUCCEEDED: "SUCCEEDED",
  FAILED: "FAILED",
};

export const PAY_IN_PRICE = [
  {
    key: "1",
    point: 5,
    price: 10000,
    color: "blue-500",
  },
  {
    key: "2",
    point: 12,
    price: 20000,
    color: "blue-600",
  },
  {
    key: "3",
    point: 25,
    price: 50000,
    color: "red-600",
  },
];

export const PAY_IN_METHOD = [
  {
    key: "Momo",
    name: "Momo",
    image: "/assets/momo.png",
    methods: [
      {
        key: "Momo_QR",
        name: "Momo QR",
        image: "/assets/qr.png",
        information: {
          accountName: "Trần Trọng Hiếu",
          accountImage: "/assets/momo-qr.jpg",
          accountDescription: "Quét mã QR bằng ứng dụng Momo để thanh toán.",
        },
      },
    ],
  },
  {
    key: "Bank",
    name: "Ngân Hàng",
    image: "/assets/debit.png",
    methods: [
      {
        key: "Bank_Agribank",
        name: "Agribank - NH Nông Nghiệp và PT Nông Thôn VN",
        image: "/assets/agribank.png",
        information: {
          accountName: "Trần Trọng Hiếu",
          accountNumber: "5907205256109",
          accountDescription: "Vui lòng ghi đúng nội dung chuyển khoản.",
        },
      },
      {
        key: "Bank_Vietcombank",
        name: "Vietcombank - NH Thương Mại CP Ngoại thương VN",
        image: "/assets/vietcombank.png",
        information: {
          accountName: "Trần Trọng Hiếu",
          accountNumber: "1030476167",
          accountUsername: "TRONGHIEU2001",
          accountDescription: "Vui lòng ghi đúng nội dung chuyển khoản.",
        },
      },
    ],
  },
];
