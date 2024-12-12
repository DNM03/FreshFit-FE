import { View, Text, Modal } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { Switch } from "~/components/ui/switch";

type PreferencesProps = {
  //   visible: boolean;
  onClose: () => void;
};

const Preferences = ({ onClose }: PreferencesProps) => {
  return (
    <Modal>
      <View className="flex flex-row items-center justify-between w-full">
        <ChevronLeft size={24} color="#176219" onPress={onClose} />
        <Text className="text-[#176219] text-2xl font-medium">Preferences</Text>
        <View className="ml-4 w-[24px]"></View>
      </View>
      <View>
        <View className="flex flex-row items-center justify-between px-4 mt-6">
          <Text className="text-[#176219] text-lg">Challenges</Text>
          <Switch checked onCheckedChange={() => {}} className="bg-[#176219]" />
        </View>
        <View className="flex flex-row items-center justify-between px-4 mt-6">
          <Text className="text-[#176219] text-lg">Meals</Text>
          <Switch checked onCheckedChange={() => {}} className="bg-[#176219]" />
        </View>
        <View className="flex flex-row items-center justify-between px-4 mt-6">
          <Text className="text-[#176219] text-lg">Exercises</Text>
          <Switch checked onCheckedChange={() => {}} className="bg-[#176219]" />
        </View>
        <View className="flex flex-row items-center justify-between px-4 mt-6">
          <Text className="text-[#176219] text-lg">Water</Text>
          <Switch checked onCheckedChange={() => {}} className="bg-[#176219]" />
        </View>
        <View className="flex flex-row items-center justify-between px-4 mt-6">
          <Text className="text-[#176219] text-lg">Health</Text>
          <Switch checked onCheckedChange={() => {}} className="bg-[#176219]" />
        </View>
      </View>
    </Modal>
  );
};

export default Preferences;
