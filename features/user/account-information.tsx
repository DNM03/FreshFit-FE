import { View, Text, Modal } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import EditAccountForm from "./edit-account-form";

const AccountInformation = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal>
      <View className="flex flex-row items-center justify-between w-full">
        <ChevronLeft size={24} color="#176219" onPress={onClose} />
        <Text className="text-[#176219] text-2xl font-medium">
          Account Information
        </Text>
        <View className="ml-4 w-[24px]"></View>
      </View>
      <EditAccountForm />
    </Modal>
  );
};

export default AccountInformation;
