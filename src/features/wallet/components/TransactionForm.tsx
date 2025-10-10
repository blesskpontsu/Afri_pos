import React from "react";
import { Form, Formik } from "formik";
import { InputField } from "../../../components/Field";
import { DepositDraft, WithdrawalDraft } from "../lib/types";
import { IonButton, IonLoading } from "@ionic/react";
import * as Yup from "yup";

type Props = {
  onSubmit: (values: DepositDraft & WithdrawalDraft) => void;
  buttonLabel: string;
  loading: boolean;
  type?: "withdrawal" | "deposit";
};

export const networks = [
  { label: "MTN", value: "mtn" },
  { label: "Vodafone", value: "vodafone" },
  { label: "Airtel Tigo", value: "airtel" },
];

function TransactionForm({
  buttonLabel,
  type = "deposit",
  onSubmit,
  loading,
}: Props) {
  // Define validation schema inside component to access props
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Must be positive"),
    phone_number: Yup.string().required("Phone number is required"),
    verify_phone_number:
      type === "withdrawal"
        ? Yup.string()
            .required("Please verify your phone number")
            .oneOf([Yup.ref("phone_number")], "Phone numbers must match")
        : Yup.string(),
    channel: Yup.string().required("Network is required"),
    password:
      type === "withdrawal"
        ? Yup.string().required("Password is required")
        : Yup.string(),
  });

  return (
    <Formik<DepositDraft & WithdrawalDraft>
      initialValues={{
        amount: "",
        phone_number: "",
        verify_phone_number: "",
        channel: "mtn",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        console.log(values);
      }}
    >
      {(props) => {
        const phoneMatch =
          props.values.phone_number &&
          props.values.verify_phone_number &&
          props.values.phone_number === props.values.verify_phone_number;

        return (
          <Form className="w-full max-w-md p-5 space-y-5">
            <InputField
              type="number"
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.handleChange(e);
                props.setFieldTouched("phone_number", true, false);
                props.validateField("verify_phone_number");
              }}
            />

            {type === "withdrawal" && (
              <InputField
                required
                prefix="+223"
                name="verify_phone_number"
                placeholder="Verify your phone number"
                label="Verify Phone number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  props.handleChange(e);
                  props.setFieldTouched("verify_phone_number", true, false);
                }}
                className={
                  props.errors.verify_phone_number ? "border-red-500" : ""
                }
              />
            )}

            {props.values.phone_number &&
              props.values.verify_phone_number &&
              type === "withdrawal" && (
                <div
                  className={`text-sm ${phoneMatch ? "text-green-500" : "text-red-500"}`}
                >
                  {phoneMatch
                    ? "✓ Phone numbers match"
                    : "✗ Phone numbers do not match"}
                </div>
              )}

            <InputField
              label="Network"
              placeholder="Select Network"
              required
              as="select"
              name="channel"
              options={networks}
              widget="radioButton"
            />

            {type === "withdrawal" && (
              <InputField
                required
                name="password"
                placeholder="Enter your password"
                label="Password"
                type="password"
              />
            )}

            <IonButton
              expand="block"
              type="submit"
              disabled={!props.isValid || loading}
            >
              {buttonLabel}
            </IonButton>

            <IonLoading isOpen={loading} message="Processing..." />
          </Form>
        );
      }}
    </Formik>
  );
}

export default TransactionForm;
