import React from "react";
import { Form, Formik, useFormik } from "formik";
import { InputField } from "../../../components/Field";
import { TransferDraft, WithdrawalDraft } from "../lib/types";
import { IonButton, IonLoading } from "@ionic/react";

type Props = {
  onSubmit: (values: TransferDraft) => void;
  buttonLabel: string;
  loading: boolean;
};

function TransferForm({ buttonLabel, onSubmit, loading }: Props) {
  return (
    <Formik<TransferDraft>
      initialValues={{
        amount: "",
        password: "",
      }}
      onSubmit={(values, formikHelpers) => {
        onSubmit(values);
      }}
    >
      {(props) => {
        return (
          <Form
            onSubmit={props.handleSubmit}
            className="w-full max-w-md p-5 space-y-5"
          >
            <InputField
              required
              name="amount"
              type="number"
              label="Amount"
              placeholder="Amount"
            />
            <InputField
              type={"password"}
              required
              name="password"
              placeholder="Enter your password"
              label="Password"
            />
            <IonButton expand="block" type="submit">
              {buttonLabel}
            </IonButton>
            <IonLoading
              isOpen={loading}
              trigger="open-loading"
              message="Loading...."
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default TransferForm;
