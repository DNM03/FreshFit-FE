import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  const handleNavigate = () => {
    console.log("Navigating to home");
    router.navigate("/home/dashboard/dashboard");
  };
  return (
    <View className="flex-1 items-center justify-around">
      <View className="absolute top-0 left-0 right-0 bottom-0 flex-col">
        <View className="flex-[60%] bg-[#E0FBE2]" />
        <View className="flex-[40%] bg-[#ACE1AF] rounded-t-2xl mt-[-15px]" />
      </View>
      <Image
        source={require("~/assets/images/freshfit_logo.png")}
        className="w-[170px] h-[140px]"
      />
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center ">
          <Text className="text-4xl font-semibold text-[#176219]">Login</Text>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <Input placeholder="Enter your email or username" />
          <Input placeholder="Enter your password" secureTextEntry />
          <Link
            href="/auth/forgot-password"
            className="text-[#176219] text-right text-sm mt-4 font-semibold"
          >
            Forgot password?
          </Link>
          <Button
            className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4"
            size="lg"
            onPress={handleNavigate}
          >
            <Text className="text-[#E0FBE2] text-lg ">Let's go</Text>
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center">
          <Text className="text-[#176219] text-lg font-bold mb-4">Or</Text>
          <Pressable>
            <Image
              source={require("~/assets/images/google_icon.png")}
              className="w-[60px] h-[60px]"
            />
          </Pressable>
        </CardFooter>
      </Card>
      <Link
        href="/auth/register"
        className="text-[#176219] text-base font-bold"
      >
        Don't have an account? Sign up
      </Link>
    </View>
  );
};

export default Login;
