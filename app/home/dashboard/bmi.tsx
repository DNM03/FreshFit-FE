import { View, Text, Image } from "react-native";
import React from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import DayCard from "~/components/ui/day-card";
import { Button } from "~/components/ui/button";

const BMIScreen = () => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(2);
  const data = useGlobalSearchParams();
  console.log(data);
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

  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };
  const calculateBMI = (weight: number, height: number): number => {
    const heightInMeters = height / 100;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  const getBMIImage = (bmi: number) => {
    if (bmi < 18.5) {
      return require("~/assets/images/bmi_underweight.png");
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return require("~/assets/images/bmi_normal.png");
    } else if (bmi >= 25 && bmi < 29.9) {
      return require("~/assets/images/bmi_overweight.png");
    } else if (bmi >= 30 && bmi < 34.9) {
      return require("~/assets/images/bmi_obese.png");
    } else {
      return require("~/assets/images/bmi_extremely_obese.png");
    }
  };

  const bmi = calculateBMI(Number(data.weight), Number(data.height));

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
            <Text className="text-[#176219] font-semibold text-2xl">BMI</Text>
          </View>
        </View>
        <View className="flex flex-row gap-x-4 w-full justify-center items-end px-3">
          {daysData.map((day, index) => (
            <Pressable key={index} onPress={() => setIsActive(index)}>
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
        <View className="flex flex-row justify-around mt-4  h-[60%]">
          <View>
            <Image source={getBMIImage(bmi)} className="h-2/3 w-[130px]" />
          </View>
          <View>
            <Text className="text-[#3D6440] text-xl font-semibold">
              Weight:{" "}
              <Text className="font-bold text-red-600">{data.weight}kg</Text>
            </Text>
            <Text className="text-[#3D6440] text-xl font-semibold">
              Height:{" "}
              <Text className="font-bold text-red-600">{data.height}cm</Text>
            </Text>
            <Text className="text-[#3D6440] text-xl font-semibold">
              Age:{" "}
              <Text className="font-bold text-red-600">
                {calculateAge(
                  Array.isArray(data?.date_of_birth)
                    ? data?.date_of_birth[0]
                    : data?.date_of_birth
                )}
              </Text>
            </Text>
            <Text className="text-[#3D6440] text-xl font-semibold">
              Gender:{" "}
              <Text className="font-bold text-red-600">
                {data?.gender === "0" ? "Male" : "Female"}
              </Text>
            </Text>
            <Text className="text-[#3D6440] text-xl font-semibold">
              BMI:{" "}
              <Text className="font-bold text-red-600">
                {calculateBMI(Number(data.weight), Number(data.height))}
              </Text>
            </Text>
          </View>
        </View>
        <View className="pb-14 px-10">
          <Button className="bg-[#176219]">
            <Text className="text-[#E0FBE2]">Update my information</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default BMIScreen;
