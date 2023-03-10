import { injectSubHeader, TransactionColumn } from "./transaction-columns";

const dummyTransaction: TransactionColumn[] = [
  {
    id: "2E70DD75-BF3E-487F-939F-B7DB01999113",
    date: "2023-01-11",
    account: "E-Money",
    category: "๐ Transport",
    subCategory: "Parkir๐ฟ๏ธ",
    content: "Parkir Pejaten Village",
    amount: 4000,
    type: "Expenses",
  },
  {
    id: "23BFEC6F-AA34-4FDA-91DB-ACBEA2377AAF",
    date: "2023-01-11",
    account: "ShopeePay",
    category: "๐ฑ Food",
    subCategory: "Minuman ๐ฅค",
    content: "Fore Coffee",
    amount: 25000,
    type: "Expenses",
  },
  {
    id: "FAF8A215-8373-4997-90E3-D1FDBDEBED81",
    date: "2023-01-11",
    account: "ShopeePay",
    category: "๐ฑ Food",
    subCategory: "Makan berat ๐",
    content: "Ayam Geprek ๐ถ",
    amount: 15000,
    type: "Expenses",
  },
  {
    id: "913EF28E-10C5-436B-89DD-286E6424D773",
    date: "2023-01-10",
    account: "Gopay",
    category: "๐ฑ Food",
    subCategory: "Makan berat ๐",
    content: "Ayam Penyet Sosro",
    amount: 18000,
    type: "Expenses",
  },
  {
    id: "3E0AD5CC-18DD-4C3F-A1D1-8280FE21A37B",
    date: "2023-01-10",
    account: "E-Money",
    category: "๐ Transport",
    subCategory: "Parkir๐ฟ๏ธ",
    content: "Parkir Kantor ๐ข",
    amount: 12000,
    type: "Expenses",
  },
  {
    id: "5B7167C1-B429-48D5-9C59-4327995C2064",
    date: "2023-01-09",
    account: "Cash",
    category: "๐ Transport",
    subCategory: "Parkir๐ฟ๏ธ",
    content: "Parkir Gandarichi",
    amount: 5000,
    type: "Expenses",
  },
  {
    id: "BBE8EAB8-66EB-4F3B-974C-31AF06041026",
    date: "2023-01-09",
    account: "Gopay",
    category: "๐ฑ Food",
    subCategory: "Makan berat ๐",
    content: "Gandarichi",
    amount: 999999,
    type: "Expenses",
  },
];

const expectedTransaction: TransactionColumn[] = [
  {
    id: "subheader-2023-01-11",
    date: "2023-01-11",
    account: "",
    category: "",
    subCategory: "",
    content: "",
    amount: 0,
    type: "",
  },
  {
    id: "2E70DD75-BF3E-487F-939F-B7DB01999113",
    date: "2023-01-11",
    account: "E-Money",
    category: "๐ Transport",
    subCategory: "Parkir๐ฟ๏ธ",
    content: "Parkir Pejaten Village",
    amount: 4000,
    type: "Expenses",
  },
  {
    id: "23BFEC6F-AA34-4FDA-91DB-ACBEA2377AAF",
    date: "2023-01-11",
    account: "ShopeePay",
    category: "๐ฑ Food",
    subCategory: "Minuman ๐ฅค",
    content: "Fore Coffee",
    amount: 25000,
    type: "Expenses",
  },
  {
    id: "FAF8A215-8373-4997-90E3-D1FDBDEBED81",
    date: "2023-01-11",
    account: "ShopeePay",
    category: "๐ฑ Food",
    subCategory: "Makan berat ๐",
    content: "Ayam Geprek ๐ถ",
    amount: 15000,
    type: "Expenses",
  },
  {
    id: "subheader-2023-01-10",
    date: "2023-01-10",
    account: "",
    category: "",
    subCategory: "",
    content: "",
    amount: 0,
    type: "",
  },
  {
    id: "913EF28E-10C5-436B-89DD-286E6424D773",
    date: "2023-01-10",
    account: "Gopay",
    category: "๐ฑ Food",
    subCategory: "Makan berat ๐",
    content: "Ayam Penyet Sosro",
    amount: 18000,
    type: "Expenses",
  },
  {
    id: "3E0AD5CC-18DD-4C3F-A1D1-8280FE21A37B",
    date: "2023-01-10",
    account: "E-Money",
    category: "๐ Transport",
    subCategory: "Parkir๐ฟ๏ธ",
    content: "Parkir Kantor ๐ข",
    amount: 12000,
    type: "Expenses",
  },
  {
    id: "subheader-2023-01-09",
    date: "2023-01-09",
    account: "",
    category: "",
    subCategory: "",
    content: "",
    amount: 0,
    type: "",
  },
  {
    id: "5B7167C1-B429-48D5-9C59-4327995C2064",
    date: "2023-01-09",
    account: "Cash",
    category: "๐ Transport",
    subCategory: "Parkir๐ฟ๏ธ",
    content: "Parkir Gandarichi",
    amount: 5000,
    type: "Expenses",
  },
  {
    id: "BBE8EAB8-66EB-4F3B-974C-31AF06041026",
    date: "2023-01-09",
    account: "Gopay",
    category: "๐ฑ Food",
    subCategory: "Makan berat ๐",
    content: "Gandarichi",
    amount: 999999,
    type: "Expenses",
  },
];

test("injectSubHeader", () => {
  const result = injectSubHeader(dummyTransaction);
  expect(result).toEqual(expectedTransaction);
});
