import React, { useEffect } from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";

import { Route, Redirect } from "react-router-dom";
import { apps, people, cog } from "ionicons/icons";

import Transactions from "./Transactions";
import System from "./System";
import Dashboard from "./Dashboard";
import { useWallet } from "../../features/wallet/hooks/useWallet";

const DashboardLayout = () => {
  const wallet = useWallet();

  useEffect(() => {
    wallet.actions.getBalance();
  }, []);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/dashboard/home" component={Dashboard} />
        <Route exact path="/dashboard/transactions" component={Transactions} />
        <Route exact path="/dashboard/system" component={System} />

        <Redirect exact from="/dashboard" to="/dashboard/home" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="border-t-2 border-gray-200">
        <IonTabButton tab="home" href="/dashboard/home">
          <IonIcon aria-hidden="true" icon={apps} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>

        <IonTabButton tab="transactions" href="/dashboard/transactions">
          <IonIcon aria-hidden="true" icon={people} />
          <IonLabel>Transactions</IonLabel>
        </IonTabButton>

        <IonTabButton tab="system" href="/dashboard/system">
          <IonIcon aria-hidden="true" icon={cog} />
          <IonLabel>System</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default DashboardLayout;
