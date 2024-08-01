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
import { DepositBody, WithdrawalDraft } from "../lib/types";
import { useWallet } from "../hooks/useWallet";
import { useAuth } from "../../auth/hooks/useAuth";
import { DepositDraftToDepositBody } from "../lib/dto";

function DepositPage() {
  const depositHandler = useWallet();
  const router = useIonRouter();

  const { state } = useAuth();
  const onSubmit = (values: WithdrawalDraft) => {
    const body: DepositBody = DepositDraftToDepositBody(values, {
      code: state.user.code,
    });
    depositHandler.actions.deposit(body);
  };

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
              {" "}
              <IonIcon
                className="text-2xl"
                aria-hidden="true"
                icon={arrowBack}
              />
            </div>
            <h1 className="font-bold">Deposit</h1>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="flex justify-center items-center ">
        <TransactionForm
          buttonLabel="Deposit"
          loading={depositHandler.state.isLoading}
          onSubmit={onSubmit}
        />
      </IonContent>
    </IonPage>
  );
}

export default DepositPage;
