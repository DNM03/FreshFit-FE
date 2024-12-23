import { View, Text, Pressable, ImageBackground } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ScrollView } from "react-native";

const DayDetail = () => {
  const router = useRouter();
  const exercises = [
    {
      name: "Pushups",
      description: "3 sets of 10 reps",
      calories: 100,
      rest: 30,
    },
    {
      name: "Squats",
      description: "3 sets of 10 reps",
      calories: 100,
      rest: 30,
    },
    {
      name: "Plank",
      description: "3 sets of 10 reps",
      calories: 100,
      rest: 30,
    },
  ];
  return (
    <View className="flex-1">
      <View className="bg-[#FDFDFD] h-screen w-full">
        <View className="flex flex-row justify-center items-center w-full pt-2 relative  px-2">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-0 top-1/3"
          >
            <ChevronLeft size={32} color="#176219" className="" />
          </Pressable>
          <View className="  ">
            <Text className="text-[#176219] font-semibold text-2xl">
              Day 1 - Arm
            </Text>
          </View>
        </View>
        <ScrollView className="flex-1">
          <ImageBackground
            source={require("~/assets/images/workout.jpg")}
            className="w-full h-60 mt-2 pt-36 p-6"
          >
            <View className="">
              <Text className="text-white text-lg font-bold">
                This is the set that help to improve the muscle of your arm.
              </Text>
            </View>
          </ImageBackground>
          <View>
            {exercises.map((exercise, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  // router.push("/home/exercise-plan/exercise-detail")
                  router.push({
                    pathname: "/home/exercise-plan/exercise-detail",
                    params: { id: index },
                  })
                }
              >
                <View className="bg-[#E0FBE2] p-4 my-2 rounded-md flex flex-row justify-between mx-4">
                  <View>
                    <Text className="text-[#176219] font-semibold text-lg">
                      {exercise.name}
                    </Text>
                    <Text className="text-[#176219] text-sm">
                      {exercise.description}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-[#176219] font-semibold text-lg">
                      {exercise.calories} cal
                    </Text>
                    <Text className="text-[#176219] text-sm">
                      {exercise.rest} sec rest
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DayDetail;
