import React from "react";
import { card } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

type Props = {
  account: { name: string; amount?: number };
  className: string;
};
function AccountCard({ account, className }: Props) {
  return (
    <div className=" w-full">
      <div className="flex justify-between items-center ">
        <div className="flex gap-3 items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center text-white rounded-full ${className}`}
          >
            <IonIcon aria-hidden="true" icon={card} />
          </div>
          <p>{account.name}</p>
        </div>
        <p className="text-green-500">{account.amount} GHS</p>
      </div>
      <hr className="border-b-1 border-gray-100 mx-1 mt-3" />
    </div>
  );
}

export default AccountCard;
