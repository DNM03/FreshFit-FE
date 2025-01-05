import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { ChevronLeft } from "lucide-react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { FormInput } from "~/components/ui/form-input";
import CalorieCard from "~/components/ui/calorie-card";
import { Button } from "~/components/ui/button";
import { getMealByDate } from "~/services/meal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const MealDetail = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const [mealPlan, setMealPlan] = React.useState<any>({});
  const [selectedDate, setSelectedDate] = React.useState(
    params?.date || new Date().toISOString()
  );

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await getMealByDate(
          Array.isArray(selectedDate) ? selectedDate[0] : selectedDate
        );
        setMealPlan(response.meals);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchMeals();
  }, [selectedDate]);
  const [value, setValue] = React.useState("me");

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
              Meals of {params?.mealType}
            </Text>
          </View>
        </View>
        {/* <Tabs
          value={value}
          onValueChange={(value) => setValue(value)}
          className="px-4 mt-4"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="me" className="flex-1">
              <Text>Me</Text>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex-1">
              <Text>System</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="me">
            <ScrollView className="mt-4 px-4">
              {(
                mealPlan[
                  Array.isArray(params?.mealType)
                    ? params.mealType[0]
                    : params?.mealType || "breakfasts"
                ] || []
              ).map((data: any) => (
                <Pressable
                  key={data._id}
                  onPress={() =>
                    router.push({
                      pathname: "/home/meal/create-meal",
                      params: { isEdit: "true", mealId: data._id },
                    })
                  }
                >
                  <CalorieCard
                    name={data.name}
                    description={data.description}
                    calorie={data.calories}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </TabsContent>
        </Tabs> */}
        {/* <View className="px-8 w-full mt-4">
          <FormInput placeholder="Search..." className="w-full" />
        </View> */}
        {/* <Button
          className="bg-[#176219] mx-20"
          onPress={() => router.navigate("/home/meal/create-dish")}
        >
          <Text className="text-[#E0FBE2]">Create new</Text>
        </Button> */}
        <ScrollView className="mt-4 px-4">
          {(
            mealPlan[
              Array.isArray(params?.mealType)
                ? params.mealType[0]
                : params?.mealType || "breakfasts"
            ] || []
          ).map((data: any) => (
            <Pressable
              key={data._id}
              onPress={() =>
                router.push({
                  pathname: "/home/meal/create-meal",
                  params: { isEdit: "true", mealId: data._id },
                })
              }
            >
              <CalorieCard
                name={data.name}
                description={new Date(data?.date || "").toLocaleTimeString()}
                calorie={data.calories}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MealDetail;
