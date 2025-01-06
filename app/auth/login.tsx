import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  loginDefaultValues,
  loginSchema,
  LoginValues,
} from "~/lib/zod/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "~/services/auth";
import MyModal from "~/components/ui/my-modal";
import PasswordInput from "~/components/ui/password-input";

const Login = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNavigate = () => {
    console.log("Navigating to home");
    router.navigate("/home/dashboard/dashboard");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema()),
    defaultValues: loginDefaultValues,
  });
  const onSubmit: SubmitHandler<LoginValues> = async (data: LoginValues) => {
    try {
      const response = await authService.login(
        data.email_or_username,
        data.password
      );
      if (response) {
        handleNavigate();
      }
    } catch (err) {
      console.log(err);
      setIsModalVisible(true);
    }
  };
  return (
    <>
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
            <Controller
              control={control}
              name="email_or_username"
              rules={{ required: "This field is required" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Enter your email or username"
                  value={value}
                  onChangeText={onChange}
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: "This field is required" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <PasswordInput
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  error={error?.message}
                />
              )}
            />
            <Link
              href="/auth/forgot-password"
              className="text-[#176219] text-right text-sm mt-4 font-semibold"
            >
              Forgot password?
            </Link>
            <Button
              className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4"
              size="lg"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-[#E0FBE2] text-lg ">Let's go</Text>
            </Button>
          </CardContent>
          {/* <CardFooter className="flex flex-col items-center justify-center">
            <Text className="text-[#176219] text-lg font-bold mb-4">Or</Text>
            <Pressable>
              <Image
                source={require("~/assets/images/google_icon.png")}
                className="w-[60px] h-[60px]"
              />
            </Pressable>
          </CardFooter> */}
        </Card>
        <Link
          href="/auth/register"
          className="text-[#176219] text-base font-bold"
        >
          Don't have an account? Sign up
        </Link>
      </View>
      <MyModal
        visible={isModalVisible}
        title="Login Failed"
        isCloseButton
        message="Username or password is incorrect"
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default Login;
