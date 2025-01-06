import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import DayCard from "~/components/ui/day-card";
import { LiquidGauge } from "react-native-liquid-gauge";
import { Button } from "~/components/ui/button";
import { addWaterIntake, getHealthActivity } from "~/services/user";

const Water = () => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(1);
  const [goalWater, setGoalWater] = React.useState(2000);
  const [currentWater, setCurrentWater] = React.useState(1200);
  const [step, setStep] = React.useState(200);
  const [percent, setPercent] = React.useState(60);

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
      goalWater: 2000,
      currentWater: 1200,
      percent: "60%",
      isToday: false,
      date: prevDay,
      step: 200,
    },
    {
      day: todayArr[2],
      month: todayArr[1],
      weekDay: todayArr[0],
      goalWater: 2000,
      currentWater: 2000,
      percent: "100%",
      isToday: true,
      date: today,
      step: 200,
    },

    {
      day: nextDayArr[2],
      month: nextDayArr[1],
      weekDay: nextDayArr[0],
      goalWater: 2000,
      currentWater: 1500,
      percent: "75%",
      isToday: false,
      date: nextDay,
      step: 200,
    },
  ];

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
      const healthActivity = await getHealthActivity("Water", date);
      if (healthActivity.result.water.length > 0) {
        setCurrentWater(healthActivity.result.water[0].progress);
        setGoalWater(healthActivity.result.water[0].goal);
        setPercent(
          Math.round(
            (healthActivity.result.water[0].progress /
              healthActivity.result.water[0].goal) *
              100
          )
        );
        setStep(healthActivity.result.water[0].step);
        console.log(
          "Water Data:",
          JSON.stringify(healthActivity.result.water[0], null, 2)
        );
      } else {
        setCurrentWater(0);
        setGoalWater(0);
        setPercent(0);
      }
    };
    fetchData();
  }, [isActive]);

  async function handleDrinkWater() {
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
    if (percent < 100) setPercent((per) => per + 10);
    const response = await addWaterIntake(date, goalWater, step);
    if (response) {
      setCurrentWater((prev) => {
        return prev + step;
      });
      setPercent(Math.round(((currentWater + step) / goalWater) * 100));
    }
  }
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
            <Text className="text-[#176219] font-semibold text-2xl">Water</Text>
          </View>
        </View>
        <View className="flex flex-row gap-x-4 w-full justify-center items-end px-3">
          {daysData.map((day, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setIsActive(index);
                // setGoalWater(day.goalWater);
                // setCurrentWater(day.currentWater);
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
            Goal: {currentWater}/{goalWater} ml ({percent}%) - Very Well!
          </Text>
          <Text className="text-[#3D6440] font-medium text-xl text-center">
            Step: {step} ml
          </Text>
        </View>
        <View className="flex justify-center items-center mt-10">
          <LiquidGauge value={percent} width={300} height={300} />
        </View>
        {isActive === 1 && (
          <View className="mt-5 flex flex-row justify-around">
            {/* <Button className="bg-[#176219]">
            <Text className="text-[#E0FBE2]">Custom goal and step</Text>
          </Button> */}
            <Button
              className="bg-[#E0FBE2]"
              onPress={handleDrinkWater}
              disabled={percent >= 100}
            >
              <Text className="text-[#176219]">Drink water</Text>
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default Water;
