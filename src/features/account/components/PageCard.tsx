import React, { ReactNode } from "react";
import { Transaction, TransactionType } from "../../wallet/lib/types";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";
import { IonRouterLink } from "@ionic/react";

type Props = {
  transactionType: TransactionType;
};
function PageCard({ transactionType }: Props) {
  const getIcon = () => {
    switch (transactionType.id) {
      case "deposit":
        return <FaArrowTrendUp />;
      case "withdraw":
        return <FaArrowTrendDown />;
      case "transfer":
        return <BsSend />;
      default:
        return null;
    }
  };
  const getBgColor = () => {
    switch (transactionType.id) {
      case "deposit":
        return "bg-primary-default";
      case "withdraw":
        return "bg-red-500";
      case "transfer":
        return "bg-yellow-300";
    }
  };
  return (
    <IonRouterLink
      routerLink={transactionType.href}
      className={`text-white  max-w-28 w-full h-28 p-5 rounded-xl  ${getBgColor()} `}
    >
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="bg-white text-black w-10 h-10 flex justify-center items-center">
          {getIcon()}
        </div>
        <h1 className="font-semibold">{transactionType.name}</h1>
      </div>
    </IonRouterLink>
  );
}

export default PageCard;
