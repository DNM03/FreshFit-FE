import { View, Text, Modal } from "react-native";
import React from "react";
import { X } from "lucide-react-native";

const WaterCustom = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal>
      <View className="flex flex-row items-center justify-between w-full">
        <X size={24} color="#176219" onPress={onClose} />
        <Text className="text-[#176219] text-2xl font-medium">
          Custom Water
        </Text>
        <View className="ml-4 w-[24px]"></View>
      </View>
    </Modal>
  );
};

export default WaterCustom;
