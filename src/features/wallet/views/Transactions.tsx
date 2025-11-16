import React, { useState } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonToolbar,
} from "@ionic/react";

import TransactionCard from "../components/TransactionCard";
import { useGetTransactions } from "../../../features/account/queries/useGetTransactions";
import { refresh } from "ionicons/icons";
import { useWallet } from "@features/wallet/hooks/useWallet";

function AllTransactions() {
  const [selectedSegment, setSelectedSegment] = useState("Credit");
  const { response: transactions, isLoading } = useGetTransactions();

  const withdrawTransactions = (transactions ?? []).filter(
    (transaction) => transaction.type === selectedSegment,
  );

  const {
    actions: { refresh: refreshWallet },
    state: { isRefetchingTransactions, loadingBalance },
  } = useWallet();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <h1 className="ml-5 font-bold">Transactions</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="bg-[#f5f3f1] min-h-screen">
          <div className="py-4">
            <div className={"px-4"}>
              <IonSegment
                value={selectedSegment}
                onIonChange={(e: any) => setSelectedSegment(e.detail.value)}
              >
                <IonSegmentButton value="Credit">
                  <IonLabel>Deposit</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Payout">
                  <IonLabel>Withdraw</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Loading">
                  <IonLabel>Transfer</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <IonSpinner />
              </div>
            ) : (
              <>
                <div className="space-y-2 mx-4  mt-5 py-3">
                  {withdrawTransactions && withdrawTransactions.length > 0 ? (
                    withdrawTransactions.map((transaction, index) => (
                      <TransactionCard key={index} transaction={transaction} />
                    ))
                  ) : (
                    <div className="flex justify-center items-center">
                      No transactions available
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </IonContent>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton onClick={() => refreshWallet()}>
          {isRefetchingTransactions || loadingBalance ? (
            <IonSpinner />
          ) : (
            <IonIcon icon={refresh} />
          )}
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
}

export default AllTransactions;
