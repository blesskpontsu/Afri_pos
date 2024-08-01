import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonSpinner,
} from "@ionic/react";
import DashboardManagement from "../../features/account/DashboardManagement";
import { refresh } from "ionicons/icons";
import React from "react";
import { useWallet } from "../../features/wallet/hooks/useWallet";

const Dashboard: React.FC = () => {
  const {
    actions: { refresh: refreshWallet },
    state: { isRefetchingTransactions, loadingBalance },
  } = useWallet();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="bg-[#f5f3f1] min-h-screen">
          <DashboardManagement />
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
};

export default Dashboard;
