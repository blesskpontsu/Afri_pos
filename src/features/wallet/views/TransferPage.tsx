import React from "react";
import TransferForm from "../components/TransferForm";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { TransferDraft } from "../lib/types";
import { useWallet } from "../hooks/useWallet";
import { useAuth } from "../../auth/hooks/useAuth";

function TransferPage() {
  const wallet = useWallet();
  const auth = useAuth();
  const onSubmit = (values: TransferDraft) => {
    wallet.actions.transfer({
      ...values,
      amount: Number(values.amount),
      code: auth.state.user.code,
    });
  };

  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="flex gap-3 items-center pl-2">
            <div
              onClick={() =>
                router.canGoBack() ? router.goBack() : router.push("/dashboard")
              }
            >
              <IonIcon
                className="text-2xl"
                aria-hidden="true"
                icon={arrowBack}
              />
            </div>
            <h1 className="font-bold">Transfer</h1>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="flex justify-center items-center ">
        <TransferForm
          buttonLabel="Transfer"
          loading={false}
          onSubmit={onSubmit}
        />
      </IonContent>
    </IonPage>
  );
}

export default TransferPage;
