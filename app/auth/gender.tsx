import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

const Gender = () => {
  const router = useRouter();
  const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const [selectedGender, setSelectedGender] = React.useState(-1);
  return (
    <View className="flex-1 items-center justify-center bg-[#E0FBE2]">
      <Text className="text-[#176219] text-4xl font-bold mb-8">Gender?</Text>
      <View>
        {gender.map((gen, index) => (
          <Pressable key={index} onPress={() => setSelectedGender(index)}>
            <View
              className="py-4 px-4 bg-white rounded-md mb-4 w-[300px] flex flex-row justify-between"
              style={{
                borderWidth: selectedGender === index ? 1 : undefined,
                borderColor: selectedGender === index ? "#176219" : undefined,
                backgroundColor: selectedGender === index ? "#176219" : "white",
              }}
            >
              <Text
                className="text-[#176219] text-xl font-semibold"
                style={{
                  color: selectedGender === index ? "white" : "#176219",
                }}
              >
                {gen.label}
              </Text>
              <Text> {gen.value == "male" ? "👨" : "👩"}</Text>
            </View>
          </Pressable>
        ))}
      </View>
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
          onPress={() => router.push("/auth/date-of-birth")}
        >
          <Text className="text-[#E0FBE2]">Next</Text>
        </Button>
      </View>
      <View className="px-8 w-full mt-8">
        <Progress value={15} max={5} className="text-[#176219]" />
      </View>
    </View>
  );
};

export default Gender;
