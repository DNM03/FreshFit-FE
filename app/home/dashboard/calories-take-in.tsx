import { View, Text, Pressable } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import DayCard from "~/components/ui/day-card";
import { Button } from "~/components/ui/button";
import CalorieCard from "~/components/ui/calorie-card";

const CaloriesTakeIn = () => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(2);
  const [goalCalories, setGoalCalories] = React.useState(2000);
  const [currentCalories, setCurrentCalories] = React.useState(1200);
  const [percent, setPercent] = React.useState("60%");
  const daysData = [
    {
      day: "22",
      month: "November",
      weekDay: "Fri",
      goalCalories: 2000,
      currentCalories: 1200,
      percent: "60%",
      isToday: false,
    },
    {
      day: "23",
      month: "November",
      weekDay: "Sar",
      goalCalories: 2000,
      currentCalories: 2000,
      percent: "100%",
      isToday: false,
    },

    {
      day: "24",
      month: "November",
      weekDay: "Sun",
      goalCalories: 2000,
      currentCalories: 1500,
      percent: "75%",
      isToday: true,
    },
  ];
  const caloriesData = [
    {
      name: "Saldad",
      description: "1 bowl",
      calories: 100,
      pre_time: 15,
    },
  ];
  return (
    <View className="flex-1">
      <View className="bg-[#FDFDFD] h-screen w-full px-2">
        <View className="flex flex-row justify-center items-center w-full pt-2 px-4 relative">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-0 top-1/3"
          >
            <ChevronLeft size={32} color="#176219" className="" />
          </Pressable>
          <View className="  ">
            <Text className="text-[#176219] font-semibold text-2xl">
              Calories Take In
            </Text>
          </View>
        </View>
        <View className="flex flex-row gap-x-4 w-full justify-center items-end px-3">
          {daysData.map((day, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setIsActive(index);
                setGoalCalories(day.goalCalories);
                setCurrentCalories(day.currentCalories);
                setPercent(day.percent);
              }}
            >
              <DayCard
                day={day.day}
                month={day.month}
                weekDay={day.weekDay}
                isToday={day.isToday}
                isActive={isActive === index}
              />
            </Pressable>
          ))}
        </View>
        <View className="h-1 bg-[#3D6440] w-[100%] my-4 rounded-full"></View>
        <View className="mt-2">
          <Text className="text-[#3D6440] font-medium text-xl text-center">
            Goal: {goalCalories}/{currentCalories} cal ({percent}) - Great Job!
          </Text>
        </View>
        <View>
          {caloriesData.map((data, index) => (
            <CalorieCard
              key={index}
              name={data.name}
              time={data.pre_time}
              calorie={data.calories}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CaloriesTakeIn;
