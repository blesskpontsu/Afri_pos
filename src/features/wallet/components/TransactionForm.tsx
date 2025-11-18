import React, { useState, useEffect, useRef, useCallback } from "react";
import { Form, Formik } from "formik";
import { InputField } from "../../../components/Field";
import { DepositDraft, WithdrawalDraft } from "../lib/types";
import {
  IonButton,
  IonLoading,
  IonText,
  IonSpinner,
  IonInputOtp,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonLabel
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
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

// Updated deposit types with commission wording
export const depositTypes = [
  {
    label: "Discount",
    value: "discount" as const,
    description: "35% discount. Pay less from wallet"
  },
  {
    label: "Commission",
    value: "commission" as const,
    description: "35% commission. Get commission on POS"
  },
];

function TransactionForm({
  buttonLabel,
  type = "deposit",
  onSubmit,
  loading,
}: Props) {
  const [showOTPSection, setShowOTPSection] = useState(false);
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
    // Add deposit_type validation for deposit type
    deposit_type:
      type === "deposit"
        ? Yup.string().required("Deposit type is required")
        : Yup.string(),
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((timer) => timer - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // Auto-verify when OTP reaches 4 digits
  useEffect(() => {
    if (otpValue.length === 4 && showOTPSection) {
      handleVerifyOTP();
    }
  }, [otpValue, showOTPSection]);

  const startResendTimer = () => {
    setResendTimer(60);
  };

  // Handle OTP request
  const handleRequestOTP = async (phoneNumber: string, values: any) => {
    try {
      await otpManager.requestOTP({
        phone_number: phoneNumber,
      });
      setCurrentPhoneNumber(phoneNumber);
      setPendingFormValues(values);
      setShowOTPSection(true);
      setOtpValue("");
      setOtpError("");
      startResendTimer();
    } catch (error: any) {
      alert(error.message || "Failed to send OTP. Please try again.");
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
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
      setShowOTPSection(false);
      setOtpError("");

      if (pendingFormValues) {
        setOtpVerified(false);
        setPendingFormValues(null);
        onSubmit(pendingFormValues);
      }
    } catch (error: any) {
      setOtpError(error.message || "Invalid OTP. Please try again.");
      setOtpValue("");
    }
  };

  // Handle resend OTP
  const handleResendOTP = useCallback(async () => {
    try {
      await otpManager.requestOTP({
        phone_number: currentPhoneNumber,
      });
      setOtpValue("");
      setOtpError("");
      startResendTimer();
    } catch (error: any) {
      setOtpError(error.message || "Failed to resend OTP. Please try again.");
    }
  }, [resendTimer, otpManager.isRequestingOTP, currentPhoneNumber, otpManager]);

  // Handle OTP input change
  const handleOtpChange = (event: CustomEvent) => {
    const value = event.detail.value || "";
    setOtpValue(value);
    setOtpError("");
  };

  // Handle form submission
  const handleSubmit = (values: any) => {
    if (!otpVerified) {
      handleRequestOTP(values.phone_number, values);
      return;
    }
    onSubmit(values);
  };

  // Handle back to form
  const handleBackToForm = () => {
    setShowOTPSection(false);
    setOtpValue("");
    setOtpError("");
    setResendTimer(0);
  };

  // Calculate amounts based on selected deposit type
  const calculateAmounts = (amount: string, depositType: 'commission' | 'discount') => {
    const numericAmount = parseFloat(amount) || 0;
    if (depositType === 'discount') {
      return {
        payable: numericAmount * 0.65, // 35% discount
        commission: numericAmount * 0.35,
        final: numericAmount
      };
    } else {
      return {
        payable: numericAmount,
        commission: numericAmount * 0.35,
        final: numericAmount * 1.35
      };
    }
  };

  useEffect(() => {
    if (!loading && otpVerified) {
      setOtpVerified(false);
      setPendingFormValues(null);
      setShowOTPSection(false);
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    }
  }, [loading, otpVerified]);

  return (
    <div className="w-full max-w-md p-5 space-y-5">
      {!showOTPSection && (
        <Formik
          innerRef={formikRef}
          initialValues={{
            amount: "",
            phone_number: "",
            verify_phone_number: "",
            channel: "mtn",
            password: "",
            deposit_type: "commission" as const,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const phoneMatch = type === "withdrawal"
              ? props.values.phone_number === props.values.verify_phone_number
              : true;

            const calculatedAmounts = calculateAmounts(props.values.amount, props.values.deposit_type);

            return (
              <Form onSubmit={props.handleSubmit} className="space-y-5">
                <InputField
                  type={"number"}
                  required
                  name="amount"
                  label="Amount"
                  placeholder="Enter amount"
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
                  <>
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

                    {props.values.phone_number &&
                      props.values.verify_phone_number && (
                        <div
                          className={`text-sm ${phoneMatch ? "text-green-500" : "text-red-500"}`}
                        >
                          {phoneMatch
                            ? "✓ Phone numbers match"
                            : "✗ Phone numbers do not match"}
                        </div>
                      )}
                  </>
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

                {type === "withdrawal" && (
                  <InputField
                    required
                    name="password"
                    placeholder="Enter your password"
                    label="Password"
                    type="password"
                  />
                )}

                {/* Simplified Deposit Type Field - Only show for deposits */}
                {type === "deposit" && (
                  <div className="space-y-3">
                    <IonText>
                      <h3 className="text-lg font-semibold">Deposit Type</h3>
                    </IonText>

                    <IonRadioGroup
                      value={props.values.deposit_type}
                      onIonChange={(e) => props.setFieldValue("deposit_type", e.detail.value)}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {depositTypes.map((depositType) => (
                          <IonItem
                            key={depositType.value}
                            className="rounded-lg border h-full"
                            button
                            onClick={() => props.setFieldValue("deposit_type", depositType.value)}
                          >
                            <IonRadio value={depositType.value} slot="start" />
                            <IonLabel className="ion-text-wrap">
                              <div className="font-medium text-sm">{depositType.label}</div>
                              <div className="text-xs text-gray-600 mt-1">{depositType.description}</div>
                            </IonLabel>
                          </IonItem>
                        ))}
                      </div>
                    </IonRadioGroup>

                    {/* Simple Amount Summary */}
                    {props.values.amount && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                        <IonText color="primary">
                          <h4 className="font-semibold mb-2 text-center text-sm">Summary</h4>
                        </IonText>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>You pay:</span>
                            <span className="font-semibold">₵{calculatedAmounts.payable.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Commission:</span>
                            <span className="font-semibold text-primary">₵{calculatedAmounts.commission.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between border-t border-blue-200 pt-1 mt-1">
                            <span className="font-semibold">You receive:</span>
                            <span className="font-semibold text-primary">₵{calculatedAmounts.final.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <IonButton expand="block" type="submit" disabled={loading}>
                  {loading ? <IonSpinner /> : buttonLabel}
                </IonButton>

                <IonLoading
                  isOpen={loading}
                  message="Processing transaction..."
                />
              </Form>
            );
          }}
        </Formik>
      )}

      {showOTPSection && (
        <IonCard>
          <IonCardHeader>
            <div className="flex items-center space-x-2">
              <IonButton
                fill="clear"
                size="small"
                onClick={handleBackToForm}
                className="text-gray-600"
              >
                <IonIcon icon={arrowBack} slot="icon-only" />
              </IonButton>
              <IonCardTitle className="flex-1 text-center">Verify OTP</IonCardTitle>
              <div className="w-8"></div> {/* Spacer for balance */}
            </div>
          </IonCardHeader>
          <IonCardContent>
            <div className="flex flex-col items-center justify-center space-y-6">
              <IonText>
                <p className="text-center text-gray-600">
                  We sent a 4-digit verification code to
                </p>
                <p className="text-center font-semibold">{currentPhoneNumber}</p>
              </IonText>

              <div className="w-full flex justify-center">
                <IonInputOtp
                  value={otpValue}
                  onIonInput={handleOtpChange}
                  disabled={otpManager.isVerifyingOTP}
                />
              </div>

              {otpError && (
                <IonText color="danger">
                  <p className="text-center">{otpError}</p>
                </IonText>
              )}

              <div className="flex flex-col space-y-4 w-full">
                <IonButton
                  expand="block"
                  onClick={handleVerifyOTP}
                  disabled={otpManager.isVerifyingOTP || otpValue.length !== 4}
                >
                  {otpManager.isVerifyingOTP ? <IonSpinner /> : "Verify OTP"}
                </IonButton>

                <IonButton
                  expand="block"
                  fill="outline"
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0 || otpManager.isRequestingOTP}
                >
                  {otpManager.isRequestingOTP ? (
                    <IonSpinner />
                  ) : resendTimer > 0 ? (
                    `Resend in ${resendTimer}s`
                  ) : (
                    "Resend OTP"
                  )}
                </IonButton>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      )}
    </div>
  );
}

export default TransactionForm;