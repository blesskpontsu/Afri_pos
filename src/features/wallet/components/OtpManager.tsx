import { useState } from "react";
import { otpApi, endpoints } from "../../../lib/api";

interface OTPRequest {
  phone_number: string;
}

interface OTPVerify {
  phone_number: string;
  otp: string;
}

export function useOTPManager() {
  const [isRequestingOTP, setIsRequestingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  const requestOTP = async (payload: OTPRequest): Promise<void> => {
    setIsRequestingOTP(true);
    try {
      await otpApi.post(endpoints.requestOTP, payload);
    } catch (error) {
      throw new Error("Failed to send OTP. Please try again.");
    } finally {
      setIsRequestingOTP(false);
    }
  };

  const verifyOTP = async (payload: OTPVerify): Promise<void> => {
    setIsVerifyingOTP(true);
    try {
      await otpApi.post(endpoints.verifyOTP, payload);
    } catch (error) {
      throw new Error("Invalid OTP. Please try again.");
    } finally {
      setIsVerifyingOTP(false);
    }
  };

  return {
    requestOTP,
    verifyOTP,
    isRequestingOTP,
    isVerifyingOTP,
  };
}