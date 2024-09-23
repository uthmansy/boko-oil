import { ColumnsType } from "antd/es/table";
import { PurchasePayments } from "../types/db";
import { formatNumber } from "../helpers/functions";

export const purchasesPaymentsAdminColumns: ColumnsType<PurchasePayments> = [
  {
    title: "S.N",
    render: (_, __, index) => index + 1, // Calculate row number
    width: 70,
  },
  {
    title: "Account Number",
    dataIndex: "account_number",
    key: "account_number",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Account Name",
    dataIndex: "account_name",
    key: "account_name",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Payment Mode",
    dataIndex: "payment_mode",
    key: "payment_mode",
    render: (text) => <span className="capitalize font-semibold">{text}</span>,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (text) => (
      <span className="italic text-red-700">{`₦${formatNumber(text)}`}</span>
    ),
  },
];
