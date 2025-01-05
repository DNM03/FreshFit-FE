import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect } from "react";
import DayCard from "~/components/ui/day-card";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { getMealByDate } from "~/services/meal";
import useMealFormStore from "~/store/useMealFormStore";

const Meals = () => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString()
  );
  const [mealPlan, setMealPlan] = React.useState<any>({});
  const mealStore: any = useMealFormStore();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await getMealByDate(selectedDate);
        setMealPlan(response.meals);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchMeals();
  }, [selectedDate]);

  const getFormattedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      weekday: "short",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const today = new Date();
  const previousDay = new Date(today);
  previousDay.setDate(today.getDate() - 1);
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  const daysData = [
    {
      month: getFormattedDate(previousDay).split(" ")[1],
      day: getFormattedDate(previousDay).split(" ")[2],
      weekDay: getFormattedDate(previousDay).split(" ")[0],
      isToday: false,
      isoDay: previousDay.toISOString(),
    },
    {
      month: getFormattedDate(today).split(" ")[1],
      day: getFormattedDate(today).split(" ")[2],
      weekDay: getFormattedDate(today).split(" ")[0],
      isToday: true,
      isoDay: today.toISOString(),
    },
    {
      month: getFormattedDate(nextDay).split(" ")[1],
      day: getFormattedDate(nextDay).split(" ")[2],
      weekDay: getFormattedDate(nextDay).split(" ")[0],
      isToday: false,
      isoDay: nextDay.toISOString(),
    },
  ];
  const sumCalories = (meals: { calories: number }[]): number => {
    return meals.reduce((total, meal) => total + meal.calories, 0);
  };
  return (
    <ScrollView className="bg-[#FDFDFD] h-screen p-5 flex-1">
      <View className="flex flex-row items-center">
        <Text className="text-[#176219] text-5xl font-semibold w-[240px]">
          Meals
        </Text>
        {/* <Picker
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
        </Picker> */}
      </View>
      <View className="flex flex-row  w-full justify-center items-end ">
        {daysData.map((day, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setIsActive(index);
              setSelectedDate(day.isoDay);
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
          mealStore.resetForm();
          router.push("/home/meal/create-meal");
        }}
      >
        <Text className="text-[#E0FBE2]">Create meal</Text>
      </Button>
      <View className="mt-4">
        {mealPlan?.breakfasts && (
          <Pressable
            onPress={() =>
              router.navigate({
                pathname: "/home/meal/meal-detail",
                params: { mealType: "breakfasts", date: selectedDate },
              })
            }
          >
            <View className="flex flex-row justify-between items-center bg-[#E0FBE2] p-4 my-2  rounded-xl pt-10">
              <Text className="text-[#176219] text-xl font-semibold">
                Breakfast
              </Text>
              <Text className="text-[#176219] text-xl font-semibold">
                {sumCalories(mealPlan?.breakfasts || [])} cal
              </Text>
            </View>
          </Pressable>
        )}
        {mealPlan?.lunches && (
          <Pressable
            onPress={() =>
              router.navigate({
                pathname: "/home/meal/meal-detail",
                params: { mealType: "lunches", date: selectedDate },
              })
            }
          >
            <View className="flex flex-row justify-between items-center bg-[#E0FBE2] p-4 my-2  rounded-xl pt-10">
              <Text className="text-[#176219] text-xl font-semibold">
                Lunch
              </Text>
              <Text className="text-[#176219] text-xl font-semibold">
                {sumCalories(mealPlan?.lunches || [])} cal
              </Text>
            </View>
          </Pressable>
        )}
        {mealPlan?.dinners && (
          <Pressable
            onPress={() =>
              router.navigate({
                pathname: "/home/meal/meal-detail",
                params: { mealType: "dinners", date: selectedDate },
              })
            }
          >
            <View className="flex flex-row justify-between items-center bg-[#E0FBE2] p-4 my-2  rounded-xl pt-10">
              <Text className="text-[#176219] text-xl font-semibold">
                Dinner
              </Text>
              <Text className="text-[#176219] text-xl font-semibold">
                {sumCalories(mealPlan?.dinners || [])} cal
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

export default Meals;
