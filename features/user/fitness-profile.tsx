import { View, Text, Modal } from "react-native";
import React from "react";
import EditUserForm from "./edit-user-form";
import { ChevronLeft } from "lucide-react-native";

const FitnessProfile = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal>
      <View className="flex flex-row items-center justify-between w-full">
        <ChevronLeft size={24} color="#176219" onPress={onClose} />
        <Text className="text-[#176219] text-2xl font-medium">
          Fitness Profile
        </Text>
        <View className="ml-4 w-[24px]"></View>
      </View>
      <EditUserForm />
    </Modal>
  );
};

export default FitnessProfile;
