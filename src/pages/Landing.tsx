import { IonContent } from "@ionic/react";
import React from "react";
import LandingPage from "../features/wallet/views/LandingPage";

function Landing() {
  return (
    <IonContent fullscreen>
      <div className="bg-[#f5f3f1] min-h-screen">
        <LandingPage />
      </div>
    </IonContent>
  );
}

export default Landing;
