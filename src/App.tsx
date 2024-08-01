import { Route } from "react-router-dom";
import { IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@ionic/react/css/core.css";
import "./styles/tailwind.css";
import "./theme/variables.css"
import WithdrawPage from "./features/wallet/views/WithdrawPage";
import DepositPage from "./features/wallet/views/DepositPage";
import TransferPage from "./features/wallet/views/TransferPage";
import Login from "./pages/Login";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

setupIonicReact();

const App: React.FC = () => (
  <IonReactRouter>
    <IonRouterOutlet>
      <Route path="/" component={Login} exact />
      {/* <Route path="/register" component={Register} exact /> */}
      {/* <Route path="/login" component={Login} exact /> */}
      <Route path="/dashboard" component={DashboardLayout} />
      <Route path="/withdraw" component={WithdrawPage} exact />
      <Route path="/deposit" component={DepositPage} exact />
      <Route path="/transfer" component={TransferPage} exact />
    </IonRouterOutlet>
  </IonReactRouter>
);

export default App;
