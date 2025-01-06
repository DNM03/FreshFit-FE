import { View, Text } from "react-native";
import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { isEmailValid } from "~/lib/utils";
import { authService } from "~/services/auth";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);
  const handleNavigate = () => {
    router.push({
      pathname: "/auth/otp",
      params: {
        email,
      },
    });
  };
  const handleForgotPassword = async () => {
    try {
      if (!isEmailValid(email)) {
        setIsValid(false);
        // alert("Invalid email");
        return;
      }
      setIsValid(true);

      const response = await authService.forgotPassword(email as string);
      if (response) {
        handleNavigate();
      }
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      console.log(errorMessage);
      alert(errorMessage);
    }
  };
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
          <Input
            onChangeText={(value) => {
              setEmail(value);
              if (isEmailValid(value)) {
                setIsValid(true);
              }
            }}
            value={email}
            placeholder="Enter your email"
            error={!isValid ? "Please enter a valid email" : undefined}
          />

          <Button
            className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4"
            size="lg"
            onPress={handleForgotPassword}
          >
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
