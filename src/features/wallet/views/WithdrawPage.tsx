import React from "react";
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
import TransactionForm from "../components/TransactionForm";
import { WithdrawalDraft } from "../lib/types";
import { useWallet } from "../hooks/useWallet";
import { useAuth } from "../../auth/hooks/useAuth";
import { WithdrawDraftToWithDrawBody } from "../lib/dto";

const WithdrawPage = () => {
  const wallet = useWallet();
  const { state } = useAuth();
  const onSubmit = (values: WithdrawalDraft) => {
    wallet.actions.withdraw({
      ...WithdrawDraftToWithDrawBody(values),
      code: state.user.code,
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
            <h1 className="font-bold">Withdraw</h1>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="flex justify-center items-center ">
        <TransactionForm
          type={"withdrawal"}
          buttonLabel="Withdraw"
          loading={false}
          onSubmit={onSubmit}
        />
      </IonContent>
    </IonPage>
  );
};

export default WithdrawPage;
