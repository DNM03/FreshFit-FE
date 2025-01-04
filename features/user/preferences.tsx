import { View, Text, Modal } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { Switch } from "~/components/ui/switch";

type PreferencesProps = {
  //   visible: boolean;
  onClose: () => void;
  myNotifySettings?: any;
};

const Preferences = ({ onClose, myNotifySettings }: PreferencesProps) => {
  const [isAdmin, setIsAdmin] = React.useState(myNotifySettings?.isAdmin);
  const [isChallenge, setIsChallenge] = React.useState(
    myNotifySettings?.isChallenge
  );
  const [isMeal, setIsMeal] = React.useState(myNotifySettings?.isEating);
  const [isExercise, setIsExercise] = React.useState(
    myNotifySettings?.isWorkout
  );
  const [isWater, setIsWater] = React.useState(myNotifySettings?.isWater);
  const [isHealth, setIsHealth] = React.useState(myNotifySettings?.isHealth);
  return (
    <Modal>
      <View className="flex flex-row items-center justify-between w-full">
        <ChevronLeft size={24} color="#176219" onPress={onClose} />
        <Text className="text-[#176219] text-2xl font-medium">Preferences</Text>
        <View className="ml-4 w-[24px]"></View>
      </View>
      <View>
        <View className="flex flex-row items-center justify-between px-4 mt-4">
          <Text className="text-[#176219] text-lg">Admin</Text>
          <Switch checked={isAdmin} onCheckedChange={setIsAdmin} className="" />
        </View>
        <View className="flex flex-row items-center justify-between px-4 mt-4">
          <Text className="text-[#176219] text-lg">Challenges</Text>
          <Switch checked={isChallenge} onCheckedChange={setIsChallenge} />
        </View>
        <View className="flex flex-row items-center justify-between px-4 mt-4">
          <Text className="text-[#176219] text-lg">Meals</Text>
          <Switch checked={isMeal} onCheckedChange={setIsMeal} />
        </View>
        <View className="flex flex-row items-center justify-between px-4 mt-4">
          <Text className="text-[#176219] text-lg">Exercises</Text>
          <Switch checked={isExercise} onCheckedChange={setIsExercise} />
        </View>
        <View className="flex flex-row items-center justify-between px-4 mt-4">
          <Text className="text-[#176219] text-lg">Water</Text>
          <Switch checked={isWater} onCheckedChange={setIsWater} />
        </View>
        <View className="flex flex-row items-center justify-between px-4 mt-4">
          <Text className="text-[#176219] text-lg">Health</Text>
          <Switch checked={isHealth} onCheckedChange={setIsHealth} />
        </View>
      </View>
    </Modal>
  );
};

export default Preferences;
