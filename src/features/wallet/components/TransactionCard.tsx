import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";
import { Transaction } from "../lib/types";
import dayjs from "dayjs";

type Props = {
  transaction: Transaction;
};

const TransactionCard = ({ transaction }: Props) => {
  const getIcon = () => {
    switch (transaction.type) {
      case "Credit":
        return (
          <div className="p-2 rounded-sm bg-yellow-200">
            <FaArrowTrendUp />
          </div>
        );

      case "Payout":
        return (
          <div className="p-2 rounded-sm bg-red-300">
            <FaArrowTrendDown />
          </div>
        );

      case "Loading":
        return (
          <div className="p-2 rounded-sm bg-green-300">
            <BsSend />
          </div>
        );

      default:
        return null;
    }
  };

  const getStatusClass = () => {
    return transaction.status === "success"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className=" w-full bg-white p-3 rounded-md">
      <div className="flex items-center space-x-4  border-b pb-3  border-b-gray-200">
        {getIcon()}
        <div className="flex flex-1 flex-col gap-1 h-full">
          <div className={"flex justify-between w-full"}>
            <p className=" font-semibold">+{transaction.phone_number}</p>
            <div
              className={`inline-block p-1 text-xs rounded ${getStatusClass()}`}
            >
              {transaction.status.charAt(0).toUpperCase() +
                transaction.status.slice(1)}
            </div>
          </div>
          <div className="flex justify-between flex-wrap gap-1 text-sm w-full">
            <p className="flex gap-1 text-gray-600">
              {transaction.type}:
              <span className="text-red-600">{transaction.amount} GHS</span>
            </p>
            {/* {transaction.type == "Credit" && <p className="flex gap-1 text-gray-600">
              Credited:
              <span className="text-red-600">{transaction.credited} GHS</span>
            </p>} */}
          </div>
        </div>
      </div>
      <div className="text-xs  flex justify-end pt-1">
        <div className="flex gap-1 items-center">
          {" "}
          Date:
          <p className="text-gray-500">
            {dayjs(transaction.date).format("MMMM D, YYYY h:mm A")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
