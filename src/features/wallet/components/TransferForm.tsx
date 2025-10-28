import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { InputField } from "../../../components/Field";
import { TransferDraft } from "../lib/types";
import { IonButton, IonLoading } from "@ionic/react";

type Props = {
  onSubmit: (values: TransferDraft) => void;
  buttonLabel: string;
  loading: boolean;
};

function TransferForm({ buttonLabel, onSubmit, loading }: Props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isDisabled) {
      setIsDisabled(false);
    }
  }, [countdown, isDisabled]);

  const handleSubmit = (values: TransferDraft) => {
    setIsDisabled(true);
    setCountdown(5);
    onSubmit(values);
  };

  return (
    <Formik<TransferDraft>
      initialValues={{ amount: "", password: "" }}
      onSubmit={handleSubmit}
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
            <IonButton expand="block" type="submit" disabled={isDisabled}>
              {isDisabled ? `Wait ${countdown}s...` : buttonLabel}
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
