import React from "react";
import Profile from "./components/Profile";
import AccountCard from "./components/Account";
import PageCard from "./components/PageCard";
import TransactionCard from "../wallet/components/TransactionCard";
import { IoIosArrowForward } from "react-icons/io";
import { transactionTypes } from "../wallet/lib/data";
import { useAuth } from "../auth/hooks/useAuth";
import { useGetTransactions } from "./queries/useGetTransactions";
import { IonRouterLink, IonSpinner } from "@ionic/react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { refresh } from "ionicons/icons";

function DashboardManagement() {
  const { user, balance } = useAuth().state;
  const { response: transactions, isLoading } = useGetTransactions();

  return (
    <div className="flex flex-col gap-5 px-4 pt-5 mb-5 ">
      <div className="w-24 mx-auto mt-2">
        <img src="/afriluck.png" alt="" className="w-full bg-cover" />
      </div>
      <Profile user={user} />
      <div className="flex flex-col gap-3 w-full bg-white px-5 rounded-lg shadow-sm ">
        <p className="font-bold text-lg pt-3">Account</p>
        {/*<AccountCard className="bg-red-500" account={accounts[0]} />*/}
        <AccountCard
          className="bg-yellow-400"
          account={{
            name: "Balance",
            amount: balance,
          }}
        />
      </div>
      <div className="flex gap-2 items-center justify-center text-white ">
        {transactionTypes.map((type) => (
          <PageCard transactionType={type} key={type.id} />
        ))}
      </div>
      <div className="space-y-10 bg-white rounded-xl shadow-sm py-2 px-2 ">
        <h1 className="font-bold text-lg pt-3 mb-5 px-3">
          Recent Transactions
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <IonSpinner />
          </div>
        ) : (
          <>
            {(transactions ?? []).slice(0, 5).map((transaction, index) => (
              <TransactionCard key={index} transaction={transaction} />
            ))}
            <IonRouterLink routerLink="/dashboard/transactions">
              <div className="flex items-center justify-center gap-2 my-5">
                <p>More</p>
                <IoIosArrowForward />
              </div>
            </IonRouterLink>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardManagement;
