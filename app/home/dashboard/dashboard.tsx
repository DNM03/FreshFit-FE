import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React from "react";
import { Card } from "~/components/ui/card";
import CircularProgress from "react-native-circular-progress-indicator";
import { LiquidGauge } from "react-native-liquid-gauge";
import { useRouter } from "expo-router";

const Dashboard = () => {
  const router = useRouter();
  return (
    <ScrollView className="bg-[#FDFDFD] h-screen p-5">
      <Text className="text-[#176219] text-5xl font-semibold">Hello User</Text>
      <Pressable
        onPress={() => router.navigate("/home/dashboard/calories-take-in")}
      >
        <Card className="p-5 flex flex-col items-center bg-[#E0FBE2]">
          <Text className="text-center text-[#176219] font-semibold text-xl">
            Calories Take In
          </Text>
          <View className="flex flex-row justify-around w-full">
            <View className=" flex justify-center">
              <CircularProgress
                value={60}
                valueSuffix={"%"}
                progressValueColor={"#73CFD4"}
                activeStrokeColor={"#73CFD4"}
              />
            </View>
            <View>
              <View className="flex flex-col my-4">
                <Text className="text-[#176219] font-semibold text-2xl">
                  2000<Text className="font-medium text-base">cal</Text>
                </Text>
                <Text className="font-light text-[#176219]">Goal</Text>
              </View>
              <View>
                <Text className="text-[#176219] font-semibold text-2xl">
                  800<Text className="font-medium text-base">cal</Text>
                </Text>
                <Text className="font-light text-[#176219]">Remaining</Text>
              </View>
            </View>
          </View>
        </Card>
      </Pressable>
      <Pressable
        onPress={() => router.navigate("/home/dashboard/calories-burned")}
      >
        <Card className="p-5 flex flex-col items-center bg-[#E0FBE2] mt-4">
          <Text className="text-center text-[#176219] font-semibold text-xl">
            Calories Burned
          </Text>
          <View className="flex flex-row justify-around w-full">
            <View className=" flex justify-center">
              <CircularProgress
                value={60}
                valueSuffix={"%"}
                progressValueColor={"#73CFD4"}
                activeStrokeColor={"#73CFD4"}
              />
            </View>
            <View>
              <View className="flex flex-col my-4">
                <Text className="text-[#176219] font-semibold text-2xl">
                  2000<Text className="font-medium text-base">cal</Text>
                </Text>
                <Text className="font-light text-[#176219]">Goal</Text>
              </View>
              <View>
                <Text className="text-[#176219] font-semibold text-2xl">
                  800<Text className="font-medium text-base">cal</Text>
                </Text>
                <Text className="font-light text-[#176219]">Remaining</Text>
              </View>
            </View>
          </View>
        </Card>
      </Pressable>
      <View className="flex flex-row mt-4">
        <Card className="w-[48%] p-3 bg-[#E0FBE2] ">
          <Pressable onPress={() => router.navigate("/home/dashboard/water")}>
            <Text className="text-center text-[#176219] font-semibold text-xl">
              Water
            </Text>
            <View className="flex justify-center items-center mt-3">
              <LiquidGauge value={60} />
            </View>
            <View className="flex flex-row justify-between mt-3">
              <View>
                <Text className="text-[#176219] font-semibold text-xl ml-2 inline-flex">
                  2000<Text className="font-medium text-base">ml</Text>
                </Text>
                <Text className="font-light text-[#176219] ml-2">Goal</Text>
              </View>
              <View>
                <Text className="text-[#176219] font-semibold text-xl ml-2 inline-flex">
                  800<Text className="font-medium text-base">ml</Text>
                </Text>
                <Text className="font-light text-[#176219] ml-2">
                  Remaining
                </Text>
              </View>
            </View>
          </Pressable>
        </Card>
        <Card className="w-[48%] ml-auto pt-3 bg-[#E0FBE2]">
          <Pressable onPress={() => router.navigate("/home/dashboard/bmi")}>
            <Text className="text-center text-[#176219] font-semibold text-xl">
              BMI
            </Text>
            <View>
              <Image
                source={require("../../../assets/images/bmi.png")}
                className="w-full h-48"
              />
            </View>
          </Pressable>
        </Card>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
