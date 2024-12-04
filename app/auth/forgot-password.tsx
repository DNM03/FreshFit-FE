import { View, Text } from "react-native";
import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

const ForgotPassword = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/auth/otp");
  }
  return (
    <View className="flex-1 items-center justify-around bg-[#E0FBE2]">
      <View></View>
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center ">
          <Text className="text-4xl font-semibold text-[#176219]">
            Forgot Password
          </Text>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <Input placeholder="Enter your email" />

          <Button className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4" size="lg" onPress={handleNavigate}>
            <Text className="text-[#E0FBE2] text-lg ">Send</Text>
          </Button>
        </CardContent>
      </Card>
      <Link
        href="/auth/login"
        className="text-[#176219] text-base font-bold mt-40"
      >
        Already have an account? Log in
      </Link>
    </View>
  );
};

export default ForgotPassword;
