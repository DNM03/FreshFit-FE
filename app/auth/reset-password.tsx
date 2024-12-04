import { View, Text } from "react-native";
import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const ResetPassword = () => {
  return (
    <View className="flex-1 items-center justify-center bg-[#E0FBE2]">
      <View></View>
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center ">
          <Text className="text-4xl font-semibold text-[#176219]">
            Reset Password
          </Text>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <Input placeholder="Enter your new password" />
          <Input placeholder="Confirm your new password" />

          <Button className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4" size="lg">
            <Text className="text-[#E0FBE2] text-lg ">Send</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
};

export default ResetPassword;
