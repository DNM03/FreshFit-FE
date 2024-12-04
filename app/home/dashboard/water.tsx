import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import DayCard from "~/components/ui/day-card";
import { LiquidGauge } from "react-native-liquid-gauge";
import { Button } from "~/components/ui/button";

const Water = () => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(2);
  const [goalWater, setGoalWater] = React.useState(2000);
  const [currentWater, setCurrentWater] = React.useState(1200);
  const [percent, setPercent] = React.useState(60);
  const daysData = [
    {
      day: "22",
      month: "November",
      weekDay: "Fri",
      goalWater: 2000,
      currentWater: 1200,
      percent: 60,
      isToday: false,
    },
    {
      day: "23",
      month: "November",
      weekDay: "Sar",
      goalWater: 2000,
      currentWater: 2000,
      percent: 100,
      isToday: false,
    },

    {
      day: "24",
      month: "November",
      weekDay: "Sun",
      goalWater: 2000,
      currentWater: 1500,
      percent: 75,
      isToday: true,
    },
  ];
  return (
    <View className="flex-1">
      <View className="bg-[#FDFDFD] h-screen w-full px-2">
        <View className="flex flex-row justify-center items-center w-full pt-2 px-4 relative">
          <Pressable
            onPress={() => router.navigate("/home/dashboard/dashboard")}
            className="absolute left-0 top-1/3"
          >
            <ChevronLeft size={32} color="#176219" className="" />
          </Pressable>
          <View className="  ">
            <Text className="text-[#176219] font-semibold text-2xl">Water</Text>
          </View>
        </View>
        <View className="flex flex-row gap-x-4 w-full justify-between items-end px-3">
          {daysData.map((day, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setIsActive(index);
                setGoalWater(day.goalWater);
                setCurrentWater(day.currentWater);
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
            Goal: {currentWater}/{goalWater} ml ({percent}%) - Very Well!
          </Text>
          <Text className="text-[#3D6440] font-medium text-xl text-center">
            Step: 200 ml
          </Text>
        </View>
        <View className="flex justify-center items-center mt-10">
          <LiquidGauge value={percent} width={300} height={300} />
        </View>
        <View className="mt-20 flex flex-row justify-around">
          <Button className="bg-[#176219]">
            <Text className="text-[#E0FBE2]">Custom goal and step</Text>
          </Button>
          <Button
            className="bg-[#E0FBE2]"
            onPress={() => {
              if (percent < 100) setPercent((per) => per + 10);
            }}
          >
            <Text className="text-[#176219]">Drink water</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Water;
