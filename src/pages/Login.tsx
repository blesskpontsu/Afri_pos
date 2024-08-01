import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import LoginPage from "../features/auth/LoginPage";

function Login() {
  return (
    <IonPage className={"bg-[#f5f3f1]"} hidden={false}>
      <IonContent fullscreen>
        <div className=" min-h-screen">
          <LoginPage />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Login;
