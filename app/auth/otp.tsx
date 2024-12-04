import { View, Text } from "react-native";
import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import OTPInput from "~/components/ui/otp-input";
import { useRouter } from "expo-router";

const OtpScreen = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/auth/reset-password");
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
          <OTPInput />
          <Button className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4" size="lg" onPress={handleNavigate}>
            <Text className="text-[#E0FBE2] text-lg ">Confirm</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
};

export default OtpScreen;
