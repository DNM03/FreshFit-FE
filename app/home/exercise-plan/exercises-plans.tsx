import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";
import PlanCard from "~/components/ui/plan-card";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import LoadingOverlay from "~/components/ui/loading-overlay";
import {
  addWorkoutPlan,
  getRecommendedWorkoutPlans,
  searchWorkoutPlan,
} from "~/services/workout-plan";
import { debounce } from "~/utils/debounce";
import { set } from "zod";

const ExercisesPlans = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [exercisePlans, setExercisePlans] = useState<any[]>([]);
  const [value, setValue] = useState("System");
  const [search, setSearch] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const fetchPlans = async () => {
      try {
        const response = await searchWorkoutPlan(
          "",
          1,
          100,
          "All",
          value,
          "All"
        );
        setExercisePlans(response.result.workoutPlans);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, [value]);
  useEffect(() => {
    const debounceSearch = debounce(handleSearch, 300);
    debounceSearch();
  }, [search]);
  const calculateDayDiff = (date1: Date, date2: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffInTime = date2.getTime() - date1.getTime();
    return Math.round(diffInTime / oneDay);
  };
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await searchWorkoutPlan(
        search,
        1,
        100,
        "All",
        value,
        "All"
      );
      setExercisePlans(response.result.workoutPlans);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRecommend = async () => {
    setIsLoading(true);
    try {
      const response = await getRecommendedWorkoutPlans({
        height: 175,
        weight: 70,
        dream_weight: 75,
        age: 22,
        gender: "Male",
        image: "",
        diseases_info: "",
        num_of_exercises: 15,
        activityLevel: "light",
      });
      setExercisePlans([
        {
          ...response.result.workout_plan,
          isRec: true,
          estimated_calories_burned: 1000,
        },
      ]);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddCustomPlan = async (data: any) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await addWorkoutPlan(data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView className="bg-[#FDFDFD] h-screen p-5">
      <View className="flex flex-row items-center">
        <Text className="text-[#176219] text-5xl font-semibold w-[240px]">
          Plans
        </Text>
        <Picker
          selectedValue={value}
          onValueChange={(value) => setValue(value)}
          style={{
            color: "#176219",
            paddingVertical: 0,
            width: 150,
          }}
        >
          <Picker.Item
            label="System"
            value="System"
            style={{ color: "#176219" }}
          />
          <Picker.Item label="Me" value="Me" style={{ color: "#176219" }} />
        </Picker>
      </View>
      <View className="flex flex-col ">
        <FormInput
          placeholder="Search..."
          className="w-full"
          value={search}
          onChangeText={setSearch}
        />
        {value === "System" && (
          <Button
            onPress={() => {
              // setPlans((prev) => [...prev, ...recommends]);
              handleRecommend();
            }}
            className="bg-[#176219] mx-24"
          >
            <Text className="text-[#E0FBE2]">Recommend</Text>
          </Button>
        )}
      </View>
      <View>
        {exercisePlans.map((plan) => (
          <PlanCard
            key={plan._id}
            name={plan.name}
            type={plan.type}
            length={calculateDayDiff(
              new Date(plan.start_date),
              new Date(plan.end_date)
            ).toString()}
            // level={plan.level}
            estimated_calories_burned={plan.estimated_calories_burned}
            onProgress={value === "Me" ? plan.status : undefined}
            onPress={() => {
              if (!plan.isRec) {
                router.push({
                  pathname: "/home/exercise-plan/exercises-plan-detail",
                  params: {
                    planId: plan._id,
                    name: plan.name,
                    days: calculateDayDiff(
                      new Date(plan.start_date),
                      new Date(plan.end_date)
                    ).toString(),
                  },
                });
              } else {
                handleAddCustomPlan(plan);
              }
            }}
          />
        ))}
      </View>
      <LoadingOverlay visible={isLoading} />
    </ScrollView>
  );
};

export default ExercisesPlans;
