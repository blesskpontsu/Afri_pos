import React from "react";
import { Form, Formik, useFormik } from "formik";
import { InputField } from "../../../components/Field";
import { DepositDraft, WithdrawalDraft } from "../lib/types";
import { IonButton, IonLoading } from "@ionic/react";

type Props = {
  onSubmit: (values: DepositDraft & WithdrawalDraft) => void;
  buttonLabel: string;
  loading: boolean;
  type?: "withdrawal" | "deposit";
};

export const networks = [
  {
    label: "MTN",
    value: "mtn",
  },
  {
    label: "Vodafone",
    value: "vodafone",
  },
  {
    label: "Airtel Tigo",
    value: "airtel",
  },
];

function TransactionForm({
  buttonLabel,
  type = "deposit",
  onSubmit,
  loading,
}: Props) {
  return (
    <Formik<DepositDraft & WithdrawalDraft>
      initialValues={{
        amount: "",
        phone_number: "",
        channel: "mtn",
        password: "",
      }}
      onSubmit={(values, formikHelpers) => {
        onSubmit(values);
        console.log(values);
      }}
    >
      {(props) => {
        return (
          <Form
            onSubmit={props.handleSubmit}
            className="w-full max-w-md p-5 space-y-5"
          >
            <InputField
              type={"number"}
              required
              name="amount"
              label="Amount"
              placeholder="Amount"
            />
            <InputField
              required
              prefix="+223"
              name="phone_number"
              placeholder="Enter your phone number"
              label="Phone number"
            />
            <InputField
              label={"Network"}
              placeholder={"Select Network"}
              required
              as="select"
              name="channel"
              options={networks}
              widget={"radioButton"}
            />
            {type == "withdrawal" && (
              <InputField
                required
                name="password"
                placeholder="Enter your password"
                label="Password"
              />
            )}
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

export default TransactionForm;
