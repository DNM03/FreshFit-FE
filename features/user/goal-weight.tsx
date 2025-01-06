import { View, Text, Modal } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { RulerPicker } from "react-native-ruler-picker";
import { Button } from "~/components/ui/button";
import { authService } from "~/services/auth";

type GoalWeightProps = {
  //   visible: boolean;
  onClose: () => void;
  goalWeight: number;
  setRefresh: (value: boolean) => void;
};

const GoalWeight = ({ onClose, goalWeight, setRefresh }: GoalWeightProps) => {
  const [value, setValue] = React.useState(goalWeight);
  const handleUpdateInfo = async () => {
    try {
      const response = await authService.updateInfo({
        goal_weight: value,
      });
      if (response) {
        console.log("Navigating to home:", response.data);
        onClose();
      }
    } catch (err: any) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };
  return (
    <Modal>
      <View className="flex flex-row items-center justify-between w-full">
        <ChevronLeft size={24} color="#176219" onPress={onClose} />
        <Text className="text-[#176219] text-2xl font-medium">Goal Weight</Text>
        <View className="ml-4 w-[24px]"></View>
      </View>
      <View className="flex-1   bg-white">
        <RulerPicker
          min={0}
          max={240}
          step={1}
          fractionDigits={0}
          initialValue={goalWeight}
          onValueChange={(number) => setValue(parseInt(number))}
          onValueChangeEnd={(number) => setValue(parseInt(number))}
          indicatorColor="#176219"
          unit="kg"
          height={200}
          valueTextStyle={{ color: "white" }}
          unitTextStyle={{ color: "white" }}
        />
        <Text className="text-[#176219] text-center text-5xl font-semibold mt-4">
          {value} kg
        </Text>
        <View className="px-8 mt-8">
          <Button
            onPress={handleUpdateInfo}
            className="bg-[#176219]  mt-4 w-full"
          >
            <Text className="text-[#E0FBE2]">Save</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default GoalWeight;
