import React, { useContext, useRef, useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonLoading,
  IonRouterLink,
  useIonRouter,
} from "@ionic/react";
import LoginForm from "./components/LoginForm";
import { useLogin } from "./hooks/useLogin";
import { LoginBody, LoginDraft } from "./lib/types";
import { LoginnDraftToLoginbody } from "./lib/dto";

const LoginPage = () => {
  const { actions, state } = useLogin();
  const onLogin = (values: LoginDraft) => {
    const body: LoginBody = LoginnDraftToLoginbody(values);
    actions.login(body);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-10  w-full h-screen">
        <div className="w-32 mx-auto">
          <img src="/afriluck.png" alt="" className="w-full bg-cover" />
        </div>
        <div className={"w-full max-w-[80%] pb-[30%]"}>
          <LoginForm Login={onLogin} loading={state.isPending} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
