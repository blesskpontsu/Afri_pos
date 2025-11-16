import { IonButton } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";

const LandingPage: React.FC = () => {
  const history = useHistory();

  const goToLogin = () => {
    history.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#f5f3f1] text-black min-h-screen ">
      <div className="w-24 mx-auto">
        <img src="/favicon.png" alt="" className="w-full bg-cover" />
      </div>
      <div className="max-w-3xl text-center p-5">
        <h1 className="text-4xl font-bold mb-4">Welcome to AfriLuck </h1>
        <p className="text-lg mb-6">
          Africa's First Global Lucky Money Platform
        </p>
        <IonButton onClick={goToLogin} color={"success"}>
          Get Started
        </IonButton>
      </div>
    </div>
  );
};

export default LandingPage;
