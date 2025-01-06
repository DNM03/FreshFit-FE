import { View, Text } from "react-native";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import OTPInput from "~/components/ui/otp-input";
import { useLocalSearchParams, useRouter } from "expo-router";
import { authService } from "~/services/auth";

const OtpScreen = () => {
  const [otpCode, setOtpCode] = useState("");
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const handleNavigate = (fg_token: string) => {
    router.push({
      pathname: "/auth/reset-password",
      params: {
        fg_token,
      },
    });
  };
  const handleOtpCode = (code: string) => {
    setOtpCode(code);
  };
  const handleVerifyOtpCode = async () => {
    try {
      const response = await authService.verifyOtp(otpCode, email as string);
      if (response) {
        handleNavigate(response.forgot_password_token);
      }
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      console.log(errorMessage);
      alert(errorMessage);
    }
  };
  const handleResendOtpCode = async () => {
    try {
      const response = await authService.forgotPassword(email as string);
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      console.log(errorMessage);
      alert(errorMessage);
    }
  };
  return (
    <View className="flex-1 items-center justify-center bg-[#E0FBE2]">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center ">
          <Text className="text-4xl font-semibold text-[#176219]">
            Forgot Password
          </Text>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <OTPInput onCodeFilled={handleOtpCode} />
          <Button
            className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4"
            size="lg"
            onPress={handleVerifyOtpCode}
          >
            <Text className="text-[#E0FBE2] text-lg ">Confirm</Text>
          </Button>
          <Button
            className="bg-[#E0FBE2] text-[#176219] mx-10 mt-4"
            size="lg"
            onPress={handleResendOtpCode}
          >
            <Text className="text-[#176219] text-lg ">Resend</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
};

export default OtpScreen;
