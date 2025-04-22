import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React from "react";
import { Card } from "~/components/ui/card";
import CircularProgress from "react-native-circular-progress-indicator";
import { LiquidGauge } from "react-native-liquid-gauge";
import { useRouter } from "expo-router";
import { getHealthActivity, getProfile } from "~/services/user";
import { useFocusEffect } from "@react-navigation/native";
import { calculateBMI } from "~/lib/utils";
const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);
  const [waterActivity, setWaterActivity] = React.useState<any>({
    goal: 1,
    step: 0,
    progress: 0,
  });
  const [consumedActivity, setConsumedActivity] = React.useState<any>({
    value: 0,
    target: 1,
  });
  const [burnedActivity, setBurnedActivity] = React.useState<any>({
    value: 0,
    target: 1,
  });
  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          // Convert to Vietnam's time zone
          const options = { timeZone: "Asia/Ho_Chi_Minh" };
          const a = new Date();
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
          const response = await getProfile();
          const healthActivity = await getHealthActivity("All", date);
          setUser(response.result);
          setWaterActivity(
            healthActivity.result.water.length > 0
              ? healthActivity.result.water[0]
              : waterActivity
          );
          setConsumedActivity(
            healthActivity.result.consumed.length > 0
              ? healthActivity.result.consumed[0]
              : consumedActivity
          );
          setBurnedActivity(
            healthActivity.result.burned.length > 0
              ? healthActivity.result.burned[0]
              : burnedActivity
          );
          console.log("healthActivity", response.result.height);
          console.log("healthActivity", response.result.weight);
          const isBMINormal = calculateBMI(
            response.result.weight,
            response.result.height
          );
          if (!isBMINormal) {
            alert("Your BMI is not normal, please check your health profile");
            router.push("/home/user/user");
          }
        } catch (err: any) {
          const errorMessage = err.response.data.message;
          console.log(err);
          alert(errorMessage);
        }
      };

      fetchUser();

      // Cleanup function (optional, if needed)
      return () => {
        console.log("Dashboard screen unfocused");
      };
    }, [])
  );
  return (
    <ScrollView className="bg-[#FDFDFD] h-screen p-5">
      <Text className="text-[#176219] text-5xl font-semibold">
        Hello {user?.username || "User"}
      </Text>
      <Pressable
        onPress={() =>
          router.navigate({
            pathname: "/home/dashboard/calories-take-in",
          })
        }
      >
        <Card className="p-5 flex flex-col items-center bg-[#E0FBE2]">
          <Text className="text-center text-[#176219] font-semibold text-xl">
            Calories Take In
          </Text>
          <View className="flex flex-row justify-around w-full">
            <View className=" flex justify-center">
              <CircularProgress
                value={
                  consumedActivity.target !== 0 && consumedActivity.value !== 0
                    ? Math.round(
                        (consumedActivity.value / consumedActivity.target) * 100
                      )
                    : 0
                }
                valueSuffix={"%"}
                progressValueColor={"#73CFD4"}
                activeStrokeColor={"#73CFD4"}
              />
            </View>
            <View>
              <View className="flex flex-col my-4">
                <Text className="text-[#176219] font-semibold text-2xl">
                  {consumedActivity.target}
                  <Text className="font-medium text-base">cal</Text>
                </Text>
                <Text className="font-light text-[#176219]">Goal</Text>
              </View>
              <View>
                <Text className="text-[#176219] font-semibold text-2xl">
                  {consumedActivity.value}
                  <Text className="font-medium text-base">cal</Text>
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
                value={
                  burnedActivity.target !== 0 && burnedActivity.value !== 0
                    ? Math.round(
                        (burnedActivity.value / burnedActivity.target) * 100
                      )
                    : 0
                }
                valueSuffix={"%"}
                progressValueColor={"#73CFD4"}
                activeStrokeColor={"#73CFD4"}
              />
            </View>
            <View>
              <View className="flex flex-col my-4">
                <Text className="text-[#176219] font-semibold text-2xl">
                  {burnedActivity.target}
                  <Text className="font-medium text-base">cal</Text>
                </Text>
                <Text className="font-light text-[#176219]">Goal</Text>
              </View>
              <View>
                <Text className="text-[#176219] font-semibold text-2xl">
                  {burnedActivity.value}
                  <Text className="font-medium text-base">cal</Text>
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
              <LiquidGauge
                value={Math.round(
                  (waterActivity.progress / waterActivity.goal) * 100
                )}
              />
            </View>
            <View className="flex flex-row justify-between mt-3">
              <View>
                <Text className="text-[#176219] font-semibold text-xl ml-2 inline-flex">
                  {waterActivity.goal}
                  <Text className="font-medium text-base">ml</Text>
                </Text>
                <Text className="font-light text-[#176219] ml-2">Goal</Text>
              </View>
              <View>
                <Text className="text-[#176219] font-semibold text-xl ml-2 inline-flex">
                  {waterActivity.progress}
                  <Text className="font-medium text-base">ml</Text>
                </Text>
                <Text className="font-light text-[#176219] ml-2">
                  Remaining
                </Text>
              </View>
            </View>
          </Pressable>
        </Card>
        <Card className="w-[48%] ml-auto pt-3 bg-[#E0FBE2]">
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/home/dashboard/bmi",
                params: {
                  height: user?.height,
                  weight: user?.weight,
                  date_of_birth: user?.date_of_birth,
                  gender: user?.gender,
                },
              })
            }
          >
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
