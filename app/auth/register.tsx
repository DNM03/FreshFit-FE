import { View, Text } from "react-native";
import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Link, router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerDefaultValues,
  registerSchema,
  RegisterValues,
} from "~/lib/zod/register.schema";
import PasswordInput from "~/components/ui/password-input";
import { authService } from "~/services/auth";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema()),
    defaultValues: registerDefaultValues,
  });

  const onSubmit: SubmitHandler<RegisterValues> = async (
    data: RegisterValues
  ) => {
    try {
      const response = await authService.register(
        data.username,
        data.email,
        data.password
      );
      if (response) {
        handleNavigate(data.email);
      }
    } catch (err) {
      console.log(err);
      // setIsModalVisible(true);
    }
  };
  const handleNavigate = (email: string) => {
    router.dismissAll();
    router.push({
      pathname: "/auth/verify-email",
      params: {
        email,
      },
    });
  };

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
          <Controller
            control={control}
            name="username"
            rules={{ required: "This field is required" }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                placeholder="Enter your username"
                value={value}
                onChangeText={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{ required: "This field is required" }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                placeholder="Enter your email"
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
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <PasswordInput
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirm_password"
            rules={{ required: "This field is required" }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <PasswordInput
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                error={error?.message}
              />
            )}
          />
          <Button
            className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4"
            size="lg"
            onPress={handleSubmit(onSubmit)}
          >
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
