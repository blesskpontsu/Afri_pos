import { IonButton, IonLoading } from "@ionic/react";
import React from "react";
import { LoginDraft } from "../lib/types";
import { Formik } from "formik";
import { InputField } from "../../../components/Field";

type Props = {
  Login: (credential: LoginDraft) => void;
  loading: boolean;
};

function LoginForm({ Login, loading }: Props) {
  return (
    <div className="flex  flex-col gap-5 text-black max-w-4xl w-full">
      <Formik<LoginDraft>
        initialValues={{ code: "", password: "" }}
        onSubmit={(values, formikHelpers) => {
          Login(values);
        }}
      >
        {(props) => {
          return (
            <form onSubmit={props.handleSubmit} className={"space-y-8 w-full"}>
              <div className={"space-y-5"}>
                <InputField required label={"Code"} name={"code"} />
                <InputField
                  type={"password"}
                  required
                  label={"Password"}
                  name={"password"}
                />
              </div>
              <IonButton expand="block" type="submit" disabled={loading}>
                Log in
              </IonButton>
              <IonLoading message={"Loading..."} isOpen={loading} />
            </form>
          );
        }}
      </Formik>

      {/* app version */}
      <div className="text-center text-gray-300 text-xs">
        <p>App version: 1.0.1</p>
      </div>
    </div>
  );
}

export default LoginForm;
