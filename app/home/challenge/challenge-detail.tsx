import { View, Text, Pressable } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import DayCard from "~/components/ui/day-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const ChallengeDetail = () => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(1);
  const [value, setValue] = React.useState("excercise");
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
  const mealData = [
    { type: "Breakfast", calorie: 800 },
    { type: "Lunch", calorie: 500 },
    { type: "Dinner", calorie: 700 },
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
              Challenge Detail
            </Text>
          </View>
        </View>
        <View className="flex flex-row  w-full justify-center items-end mt-2">
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
        <View className="mt-4">
          <Tabs value={value} onValueChange={setValue}>
            <TabsList className="flex-row w-full">
              <TabsTrigger value="exercise" className="flex-1">
                <Text>Exercise</Text>
              </TabsTrigger>
              <TabsTrigger value="diet" className="flex-1">
                <Text>Diet</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="exercise">
              <View>
                {exercises.map((exercise, index) => (
                  <Pressable
                    key={index}
                    onPress={() =>
                      router.push("/home/exercise-plan/exercise-detail")
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
            </TabsContent>
            <TabsContent value="diet">
              <View className="mt-4 px-4">
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
            </TabsContent>
          </Tabs>
        </View>
      </View>
    </View>
  );
};

export default ChallengeDetail;
