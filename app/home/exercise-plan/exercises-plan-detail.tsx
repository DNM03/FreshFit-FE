import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { ChevronLeft, Scroll } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Button } from "~/components/ui/button";

const ExercisesPlanDetail = () => {
  const router = useRouter();
  const [dataIndex, setDataIndex] = React.useState(0);
  const data = [
    {
      week: "Week 1",
      exercises: [
        {
          name: "Arm sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 1,
        },
        {
          name: "Leg sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 2,
        },
        {
          name: "Full body sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 3,
        },
      ],
    },
    {
      week: "Week 2",
      exercises: [
        {
          name: "Arm sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 4,
        },
        {
          name: "Leg sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 5,
        },
        {
          name: "Full body sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 6,
        },
      ],
    },
    {
      week: "Week 3",
      exercises: [
        {
          name: "Arm sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 7,
        },
        {
          name: "Leg sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 8,
        },
        {
          name: "Full body sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 9,
        },
      ],
    },
    {
      week: "Week 4",
      exercises: [
        {
          name: "Arm sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 10,
        },
        {
          name: "Leg sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 11,
        },
        {
          name: "Full body sets",
          description: "3 sets of 10 reps",
          calories: 100,
          day: 12,
        },
      ],
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
              Strength for Beginners
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
                This exercise plan is designed for beginners who are looking to
                build strength.
              </Text>
            </View>
          </ImageBackground>
          <View className="px-4 mt-4">
            <FlatList
              data={data}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable onPress={() => setDataIndex(data.indexOf(item))}>
                  <View className="bg-[#E0E0E0] p-2 ml-4 rounded-md w-36">
                    <Text className="text-[#176219] font-bold text-lg text-center">
                      {item.week}
                    </Text>
                  </View>
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View className="h-1 bg-[#3D6440] w-[100%] my-4 rounded-full"></View>
            <View>
              {data[dataIndex].exercises.map((exercise, index) => (
                <Pressable
                  key={index}
                  onPress={() => router.push("/home/exercise-plan/day-detail")}
                >
                  <View className="bg-[#E0FBE2] p-4 my-2 rounded-md flex flex-row justify-between">
                    <View className="inline-flex">
                      <Text className="text-[#176219] font-bold text-lg">
                        Day {exercise.day} - {exercise.name}
                      </Text>
                      <Text className="text-[#176219] font-normal text-sm">
                        {exercise.description}
                      </Text>
                    </View>
                    <Text className="text-[#176219] font-normal text-sm">
                      {exercise.calories} calories
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
        <Button className="bg-[#176219] mx-20 mb-20">
          <Text className="text-[#E0FBE2]">Start Plan</Text>
        </Button>
      </View>
    </View>
  );
};

export default ExercisesPlanDetail;
