import { useMutation } from "@tanstack/react-query";
import { otpApi, endpoints } from "../../../lib/api";
import { useState, useCallback } from "react";

interface OTPRequest {
  phone_number: string;
}

interface OTPVerify {
  phone_number: string;
  otp: string;
}

export function useOTP() {
  const [isRequestingOTP, setIsRequestingOTP] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  const requestOTPMutation = useMutation({
    mutationFn: (payload: OTPRequest) =>
      otpApi.post(endpoints.requestOTP, payload),
    onMutate: () => setIsRequestingOTP(true),
    onSettled: () => setIsRequestingOTP(false),
  });

  const verifyOTPMutation = useMutation({
    mutationFn: (payload: OTPVerify) =>
      otpApi.post(endpoints.verifyOTP, payload),
    onMutate: () => setIsVerifyingOTP(true),
    onSettled: () => setIsVerifyingOTP(false),
  });

  const requestOTP = useCallback((payload: OTPRequest) => {
    return requestOTPMutation.mutateAsync(payload);
  }, []);

  const verifyOTP = useCallback((payload: OTPVerify) => {
    return verifyOTPMutation.mutateAsync(payload);
  }, []);

  return {
    requestOTP,
    verifyOTP,
    isRequestingOTP,
    isVerifyingOTP,
  };
}