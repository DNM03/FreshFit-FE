import { View, Text } from "react-native";
import React from "react";
import { cn } from "~/lib/utils";

type DayCardProps = {
  isToday: boolean;
  isActive: boolean;
  month: string;
  day: string;
  weekDay: string;
};

const DayCard = ({ isToday, isActive, month, day, weekDay }: DayCardProps) => {
  return (
    <View
      className={cn(
        isActive ? "bg-[#F0F1F1]" : "bg-[#FDFDFD]",
        "rounded-md p-2 flex flex-col items-center justify-center px-10"
      )}
    >
      {isToday && (
        <Text className="text-[#3D6440] text-xl font-semibold">Today</Text>
      )}
      <Text className="text-[#3D6440] text-sm">{month}</Text>
      <Text className="text-[#3D6440] text-4xl">{day}</Text>
      <Text className="text-[#3D6440] text-2xl">{weekDay.split(",")[0]}</Text>
    </View>
  );
};

export default DayCard;
