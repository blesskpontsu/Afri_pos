import React, { useState, useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import { InputField } from "../../../components/Field";
import { DepositDraft, WithdrawalDraft } from "../lib/types";
import {
  IonButton,
  IonLoading,
  IonText,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonSpinner,
  IonInputOtp
} from "@ionic/react";
import * as Yup from "yup";
import { useOTPManager } from "./OtpManager";

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
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [pendingFormValues, setPendingFormValues] = useState<any>(null);
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");

  const otpManager = useOTPManager();
  const formikRef = useRef<any>(null);
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

  // Countdown timer for resend OTP and auto-resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((timer) => {
          if (timer <= 1) {
            clearInterval(interval);
            // Auto-resend when timer expires
            if (showOTPModal && currentPhoneNumber) {
              console.log("🔄 Auto-resending OTP...");
              handleResendOTP();
            }
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer, showOTPModal, currentPhoneNumber]);

  // Auto-verify when OTP reaches 4 digits
  useEffect(() => {
    if (otpValue.length === 4 && showOTPModal) {
      console.log("Auto-verifying OTP:", otpValue);
      handleVerifyOTP();
    }
  }, [otpValue, showOTPModal]);

  const startResendTimer = () => {
    setResendTimer(60); // 60 seconds = 1 minute
  };

  // Handle OTP request
  const handleRequestOTP = async (phoneNumber: string, values: any) => {
    try {
      await otpManager.requestOTP({
        phone_number: phoneNumber,
      });
      setCurrentPhoneNumber(phoneNumber);
      setPendingFormValues(values);
      setShowOTPModal(true);
      setOtpValue(""); // Reset OTP
      setOtpError(""); // Reset error
      startResendTimer();
    } catch (error: any) {
      alert(error.message || "Failed to send OTP. Please try again.");
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
    console.log("Final OTP Verification:", otpValue, "Length:", otpValue.length);

    if (!otpValue || otpValue.length !== 4) {
      setOtpError("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      await otpManager.verifyOTP({
        phone_number: currentPhoneNumber,
        otp: otpValue,
      });
      setOtpVerified(true);
      setShowOTPModal(false);
      setOtpError("");

      // Submit the form with stored values after OTP verification
      if (pendingFormValues) {
        // Reset OTP state BEFORE submitting so form resets properly
        setOtpVerified(false);
        setPendingFormValues(null);
        onSubmit(pendingFormValues);
      }
    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      setOtpError(error.message || "Invalid OTP. Please try again.");
      setOtpValue(""); // Clear OTP on error
    }
  };

  // Handle resend OTP - FIXED: Proper event handling
  const handleResendOTP = async () => {
    console.log("🔄 Resend OTP clicked. Timer:", resendTimer, "IsRequesting:", otpManager.isRequestingOTP);

    if (otpManager.isRequestingOTP) {
      console.log("⏳ OTP request already in progress, skipping...");
      return;
    }

    try {
      await otpManager.requestOTP({
        phone_number: currentPhoneNumber,
      });
      setOtpValue(""); // Clear previous OTP
      setOtpError(""); // Clear error
      startResendTimer(); // Restart timer after successful resend
      console.log("✅ OTP resent successfully");
    } catch (error: any) {
      console.error("❌ Resend OTP failed:", error);
      setOtpError(error.message || "Failed to resend OTP. Please try again.");
    }
  };

  // Handle close modal
  const handleCloseModal = () => {
    console.log("Close modal clicked");
    setShowOTPModal(false);
    setOtpValue("");
    setOtpError("");
  };

  // Handle modal dismiss
  const handleModalDismiss = () => {
    setShowOTPModal(false);
    setOtpValue("");
    setOtpError("");
  };

  // Handle OTP input change
  const handleOtpChange = (event: CustomEvent) => {
    const value = event.detail.value || "";
    console.log("OTP Input Event:", value, "Length:", value.length);

    setOtpValue(value);
    setOtpError(""); // Clear error when user types
  };

  // Handle form submission
  const handleSubmit = (values: any) => {
    if (!otpVerified) {
      handleRequestOTP(values.phone_number, values);
      return;
    }
    onSubmit(values);
  };

  // Reset form after successful submission
  useEffect(() => {
    if (!loading && otpVerified) {
      // Form has finished submitting, reset everything
      setOtpVerified(false);
      setPendingFormValues(null);
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    }
  }, [loading, otpVerified]);

  return (
    <Formik<DepositDraft & WithdrawalDraft & { confirm_phone_number: string }>D
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
