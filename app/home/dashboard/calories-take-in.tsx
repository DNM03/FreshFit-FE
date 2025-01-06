import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import DayCard from "~/components/ui/day-card";
import CalorieCard from "~/components/ui/calorie-card";
import { getHealthActivity } from "~/services/user";

const CaloriesTakeIn = () => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(1);
  const [goalCalories, setGoalCalories] = React.useState(2000);
  const [currentCalories, setCurrentCalories] = React.useState(1200);
  const [percent, setPercent] = React.useState("60%");
  const [consumedData, setConsumedData] = React.useState<any>({
    value: 0,
    target: 1,
  });

  const today = new Date();
  console.log("Today:", today);
  const todayArr = today.toDateString().split(" ");
  // Create a new date object for the previous day
  const prevDay = new Date(today);
  prevDay.setDate(today.getDate() - 1);
  const prevDayArr = prevDay.toDateString().split(" ");

  // Create a new date object for the next day
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const nextDayArr = nextDay.toDateString().split(" ");

  const daysData = [
    {
      day: prevDayArr[2],
      month: prevDayArr[1],
      weekDay: prevDayArr[0],
      goalCalories: 2000,
      currentCalories: 1200,
      percent: "60%",
      isToday: false,
      date: prevDay,
    },
    {
      day: todayArr[2],
      month: todayArr[1],
      weekDay: todayArr[0],
      goalCalories: 2000,
      currentCalories: 2000,
      percent: "100%",
      isToday: true,
      date: today,
    },

    {
      day: nextDayArr[2],
      month: nextDayArr[1],
      weekDay: nextDayArr[0],
      goalCalories: 2000,
      currentCalories: 1500,
      percent: "75%",
      isToday: false,
      date: nextDay,
    },
  ];

  const [caloriesData, setCaloriesData] = React.useState<any[]>([
    {
      name: "Saldad",
      description: "1 bowl",
      calories: 100,
    },
    {
      name: "Burger",
      description: "1 piece",
      calories: 200,
    },
    {
      name: "Pizza",
      description: "2 slices",
      calories: 500,
    },
    {
      name: "Pasta",
      description: "1 bowl",
      calories: 400,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Is active", isActive);
      const a = daysData[isActive].date;

      // Convert to Vietnam's time zone
      const options = { timeZone: "Asia/Ho_Chi_Minh" };

      // Get year, month, and day
      const vietnamYear = a.toLocaleString("en-US", {
        ...options,
        year: "numeric",
      });
      const vietnamMonth = a.toLocaleString("en-US", {
        ...options,
        month: "2-digit",
      });
      const vietnamDay = a.toLocaleString("en-US", {
        ...options,
        day: "2-digit",
      });
      const date = `${vietnamYear}-${vietnamMonth}-${vietnamDay}`;
      // const date = "2024-12-29";
      const healthActivity = await getHealthActivity("Consumed", date);
      if (healthActivity.result.consumed.length > 0) {
        setConsumedData(healthActivity.result.consumed[0]);
        setCurrentCalories(healthActivity.result.consumed[0].value);
        setGoalCalories(healthActivity.result.consumed[0].target);
        setPercent(
          Math.round(
            (healthActivity.result.consumed[0].value /
              healthActivity.result.consumed[0].target) *
              100
          ) + "%"
        );
        setCaloriesData(
          healthActivity.result.consumed[0].healthTrackingDetails
        );
        console.log(
          "Consumed Data:",
          JSON.stringify(
            healthActivity.result.consumed[0].healthTrackingDetails,
            null,
            2
          )
        );
      } else {
        setCurrentCalories(0);
        setGoalCalories(0);
        setPercent("0%");
        setCaloriesData([]);
      }
    };
    fetchData();
  }, [isActive]);

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
                // setGoalCalories(day.goalCalories);
                // setCurrentCalories(day.currentCalories);
                // setPercent(day.percent);
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
            Goal: {currentCalories}/{goalCalories} cal ({percent}) - Great Job!
          </Text>
        </View>
        <View>
          {caloriesData.map((data, index) => (
            <CalorieCard
              key={index}
              name={data?.dish?.name}
              description={data?.dish?.unit}
              calorie={data?.dish?.calories}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CaloriesTakeIn;
