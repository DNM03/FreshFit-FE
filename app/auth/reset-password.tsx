import { View, Text } from "react-native";
import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { authService } from "~/services/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  resetPasswordDefaultValues,
  resetPasswordSchema,
  ResetPasswordValues,
} from "~/lib/zod/reset-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PasswordInput from "~/components/ui/password-input";
const ResetPassword = () => {
  const router = useRouter();
  const { fg_token } = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema()),
    defaultValues: resetPasswordDefaultValues,
  });
  const onSubmit: SubmitHandler<ResetPasswordValues> = async (
    data: ResetPasswordValues
  ) => {
    try {
      const response = await authService.resetPassword(
        fg_token as string,
        data.password,
        data.confirm_password
      );
      if (response) {
        handleNavigate();
      }
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      alert(errorMessage);
    }
  };
  const handleNavigate = () => {
    router.dismissAll();
    router.navigate("/auth/login");
  };
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
          <Controller
            control={control}
            name="password"
            rules={{ required: "This field is required" }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <PasswordInput
                placeholder="Enter your new password"
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
                placeholder="Confirm your new password"
                value={value}
                onChangeText={onChange}
                error={error?.message}
              />
            )}
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            className="bg-[#176219] text-[#E0FBE2] mx-10 mt-4"
            size="lg"
          >
            <Text className="text-[#E0FBE2] text-lg ">Send</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
};

export default ResetPassword;
