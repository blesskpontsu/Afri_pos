import {
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import SystemManagement from "../../features/account/SystemManagement";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <h1 className="ml-5 font-bold">System</h1>
        </IonToolbar>
      </IonHeader>
      <div className="bg-[#f5f3f1] min-h-screen">
        <SystemManagement />
      </div>
    </IonPage>
  );
};

export default Tab3;
