import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import DayCard from "~/components/ui/day-card";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const Meals = () => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(1);
  const daysData = [
    {
      day: "23",
      month: "November",
      weekDay: "Sar",
      isToday: false,
    },

    {
      day: "24",
      month: "November",
      weekDay: "Sun",
      isToday: true,
    },
    {
      day: "25",
      month: "November",
      weekDay: "Mon",
      isToday: false,
    },
  ];
  const mealData = [
    { type: "Breakfast", calorie: 800 },
    { type: "Lunch", calorie: 500 },
    { type: "Dinner", calorie: 700 },
  ];
  return (
    <ScrollView className="bg-[#FDFDFD] h-screen p-5 flex-1">
      <View className="flex flex-row items-center">
        <Text className="text-[#176219] text-5xl font-semibold w-[240px]">
          Meals
        </Text>
        <Picker
          onValueChange={(value) => console.log(value)}
          style={{
            color: "#176219",
            paddingVertical: 0,
            width: 150,
          }}
        >
          <Picker.Item
            label="System"
            value="system"
            style={{ color: "#176219" }}
          />
          <Picker.Item label="Me" value="me" style={{ color: "#176219" }} />
        </Picker>
      </View>
      <View className="flex flex-row  w-full justify-center items-end ">
        {daysData.map((day, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setIsActive(index);
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
      <Button
        className="mt-4 mx-10 bg-[#176219]"
        onPress={() => {
          console.log("Create new meal");
          router.push("/home/meal/create-meal");
        }}
      >
        <Text className="text-[#E0FBE2]">Create meal</Text>
      </Button>
      <View className="mt-4">
        {mealData.map((meal, index) => (
          <Pressable
            key={index}
            onPress={() => router.navigate("/home/meal/meal-detail")}
          >
            <View className="flex flex-row justify-between items-center bg-[#E0FBE2] p-4 my-2  rounded-xl pt-10">
              <Text className="text-[#176219] text-xl font-semibold">
                {meal.type}
              </Text>
              <Text className="text-[#176219] text-xl font-semibold">
                {meal.calorie} cal
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default Meals;
