import { View, Text } from "react-native";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import OTPInput from "~/components/ui/otp-input";
import { useLocalSearchParams, useRouter } from "expo-router";
import MyModal from "~/components/ui/my-modal";
import { authService } from "~/services/auth";

const VerifyEmailScreen = () => {
  const [otpCode, setOtpCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const handleNavigate = () => {
    router.dismissAll();
    router.push("/auth/level");
  };
  const handleOtpCode = (code: string) => {
    setOtpCode(code);
  };
  const handleVerifyEmail = async () => {
    try {
      console.log("Data:", otpCode);
      const response = await authService.verifyEmail(email as string, otpCode);
      if (response) {
        handleNavigate();
      }
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      console.log(errorMessage);
      setErrorMessage(errorMessage);
      setIsModalVisible(true);
    }
  };
  const handleResendVerifyEmail = async () => {
    try {
      const response = await authService.resendVerificationEmail(
        email as string
      );
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.message);
      setIsModalVisible(true);
    }
  };
  return (
    <>
      <View className="flex-1 items-center justify-center bg-[#E0FBE2]">
        <Card className="w-full max-w-sm">
          <CardHeader className="flex items-center ">
            <Text className="text-4xl font-semibold text-[#176219]">
              Verify Email
            </Text>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <OTPInput onCodeFilled={handleOtpCode} />
            <Button
              className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4"
              size="lg"
              onPress={handleVerifyEmail}
            >
              <Text className="text-[#E0FBE2] text-lg ">Confirm</Text>
            </Button>
            <Button
              className="bg-[#E0FBE2] text-[#176219] mx-10 mt-4"
              size="lg"
              onPress={handleResendVerifyEmail}
            >
              <Text className="text-[#176219] text-lg ">Resend</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
      <MyModal
        visible={isModalVisible}
        title="Error"
        isCloseButton
        message={errorMessage}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default VerifyEmailScreen;
