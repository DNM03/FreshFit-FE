import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";
import { authService } from "~/services/auth";

const EditAccountForm = () => {
  // State variables for the inputs
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission
  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New Password and Confirm Password must match.");
      return;
    }
    try {
      // Here, you can call an API or handle the form data
      console.log({
        oldPassword,
        newPassword,
        confirmPassword,
      });
      await authService.changePassword(
        oldPassword,
        newPassword,
        confirmPassword
      );
      // Simulate a successful submission
      Alert.alert("Success", "Password updated successfully!");
    } catch (error: any) {
      console.error(error);
      Alert.alert(error.response.data.message);
    }
  };

  return (
    <View className="flex-1 px-8 mt-4">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput
          placeholder="Eg, ******"
          label="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry
        />
        <FormInput
          placeholder="Eg, ******"
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <FormInput
          placeholder="Eg, ******"
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button className="mt-4 bg-[#176219]" onPress={handleSubmit}>
          <Text className="text-[#E0FBE2]">Save</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default EditAccountForm;
