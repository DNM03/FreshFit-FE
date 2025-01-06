import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RulerPicker } from "react-native-ruler-picker";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

const Weight = () => {
  const router = useRouter();
  const { goal, gender, date_of_birth, height } = useLocalSearchParams();
  const [value, setValue] = React.useState(70);
  return (
    <View className="flex-1 items-center justify-center bg-[#E0FBE2]">
      <Text className="text-[#176219] text-4xl font-bold mb-8">Weight?</Text>
      <View>
        <RulerPicker
          min={0}
          max={240}
          step={1}
          fractionDigits={0}
          initialValue={70}
          onValueChange={(number) => setValue(parseInt(number))}
          onValueChangeEnd={(number) => setValue(parseInt(number))}
          indicatorColor="#176219"
          unit="kg"
          height={200}
          valueTextStyle={{ color: "#E0FBE2" }}
          unitTextStyle={{ color: "#E0FBE2" }}
        />
      </View>
      <Text className="text-[#176219] text-5xl font-semibold mt-4">
        {value} kg
      </Text>
      <Text className="text-[#176219] text-center mx-4 mt-8">
        Tips: You can change your weight later if you are not sure, so feel free
        to enter.
      </Text>
      <View className="flex flex-row mt-8">
        <Button
          className="bg-white  mx-10 mt-4 w-[150px]"
          size="lg"
          onPress={() => router.back()}
        >
          <Text className="text-[#176219]">Back</Text>
        </Button>
        <Button
          className="bg-[#176219]  mx-10 mt-4 w-[150px]"
          size="lg"
          onPress={() => {
            if (value < 10) {
              alert("Please enter a valid weight");
            } else {
              router.push({
                pathname: "/auth/goal-weight",
                params: {
                  goal,
                  gender,
                  date_of_birth,
                  weight: value,
                  height,
                },
              });
            }
          }}
        >
          <Text className="text-[#E0FBE2]">Next</Text>
        </Button>
      </View>
      <View className="px-8 w-full mt-8">
        <Progress value={60} max={5} className="text-[#176219]" />
      </View>
    </View>
  );
};

export default Weight;
