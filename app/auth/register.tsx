import { View, Text } from "react-native";
import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";

const Register = () => {
  return (
    <View className="flex-1 items-center justify-around">
      <View className="absolute top-0 left-0 right-0 bottom-0 flex-col">
        <View className="flex-[50%] bg-[#E0FBE2]" />
        <View className="flex-[50%] bg-[#ACE1AF] rounded-t-2xl mt-[-15px]" />
      </View>

      <Card className="w-full max-w-sm mt-40">
        <CardHeader className="flex items-center ">
          <Text className="text-4xl font-semibold text-[#176219]">
            Register
          </Text>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          <Input placeholder="Enter your username" />
          <Input placeholder="Enter your email" />
          <Input placeholder="Enter your password" />
          <Input placeholder="Confirm your password" />
          <Button className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4" size="lg">
            <Text className="text-[#E0FBE2] text-lg ">Sign up</Text>
          </Button>
        </CardContent>
      </Card>
      <Link href="/auth/login" className="text-[#176219] text-base font-bold">
        Already have an account? Log in
      </Link>
    </View>
  );
};

export default Register;
