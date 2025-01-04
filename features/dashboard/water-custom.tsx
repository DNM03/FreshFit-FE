import { View, Text, Modal } from "react-native";
import React from "react";
import { X } from "lucide-react-native";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";

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
      <View className="mt-4 px-4">
        <FormInput label="Goal" placeholder="Enter goal" />
        <FormInput label="Step" placeholder="Enter step" />
        <Button className="mt-4 bg-[#176219] ">
          <Text className="text-[#E0FBE2]">Save</Text>
        </Button>
      </View>
    </Modal>
  );
};

export default WaterCustom;
