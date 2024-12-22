import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

const Describe = () => {
  const router = useRouter();
  const describes = [
    {
      label: "Not too active",
      value: "not-too-active",
      description: "I do not exercise regularly",
    },
    {
      label: "Lightly active",
      value: "lightly-active",
      description: "I exercise 1-2 times a week",
    },
    {
      label: "Moderately active",
      value: "moderately-active",
      description: "I exercise 1-2 times a week",
    },
    {
      label: "Highly active",
      value: "highly-active",
      description: "I exercise 3-4 times a week",
    },
  ];
  const [selectedDescribe, setSelectedDescrive] = React.useState(-1);
  return (
    <View className="flex-1 items-center justify-center bg-[#E0FBE2]">
      <Text className="text-[#176219] text-4xl font-bold mb-8">
        What describe you best?
      </Text>
      <View>
        {describes.map((describe, index) => (
          <Pressable key={index} onPress={() => setSelectedDescrive(index)}>
            <View
              className="p-2 px-8 bg-white rounded-md mb-4 w-[350px]"
              style={{
                borderWidth: selectedDescribe === index ? 1 : undefined,
                borderColor: selectedDescribe === index ? "#176219" : undefined,
                backgroundColor:
                  selectedDescribe === index ? "#176219" : "white",
              }}
            >
              <Text
                className="text-[#176219] text-lg font-semibold"
                style={{
                  color: selectedDescribe === index ? "white" : "#176219",
                }}
              >
                {describe.label}
              </Text>
              <Text
                className="text-[#176219] text-lg"
                style={{
                  color: selectedDescribe === index ? "white" : "#176219",
                }}
              >
                {describe.description}
              </Text>
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
          onPress={() => router.push("/home/dashboard/dashboard")}
        >
          <Text className="text-[#E0FBE2]">Next</Text>
        </Button>
      </View>
      <View className="px-8 w-full mt-8">
        <Progress value={90} max={5} className="text-[#176219]" />
      </View>
    </View>
  );
};

export default Describe;
