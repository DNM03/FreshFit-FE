import { View, Text, Pressable, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ScrollView } from "react-native";
import { getWorkoutPlanDetailById } from "~/services/workout-plan-detail";
import { getSetById } from "~/services/set";
import { getExerciseById } from "~/services/exercises";

const DayDetail = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const [setId, setSetId] = React.useState("");
  const [setDetail, setSetDetail] = React.useState<any>({});
  const [exerciseDetails, setExerciseDetails] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await getWorkoutPlanDetailById(
          Array.isArray(params?.workoutId)
            ? params.workoutId[0]
            : params?.workoutId,
          Array.isArray(params?.dayId) ? params.dayId[0] : params?.dayId
        );
        setSetId(response.workout_plan_detail.set_details[0]._id);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchWorkoutPlan();
  }, []);
  useEffect(() => {
    const fetchSetDetail = async () => {
      try {
        if (setId === "") return;
        const response = await getSetById(setId);
        setSetDetail(response.set);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchSetDetail();
  }, [setId]);
  useEffect(() => {
    const fetchExerciseDetails = async (id: string) => {
      try {
        const response = await getExerciseById(id);
        setExerciseDetails((prev) => [...prev, response.exercise]);
      } catch (error) {
        console.log("Error", error);
      }
    };
    if (setDetail?.set_exercises) {
      setDetail.set_exercises.forEach((exercise: any) => {
        fetchExerciseDetails(exercise.exercise_id);
      });
    }
  }, [setDetail]);
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
              Day {params?.day || "Detail"} - Week {params?.week || "Detail"}
            </Text>
          </View>
        </View>
        <ScrollView className="flex-1">
          <ImageBackground
            source={require("~/assets/images/workout.jpg")}
            className="w-full h-60 mt-2 pt-36 p-6"
          >
            <View className="">
              <Text className="text-white text-lg font-bold">
                {setDetail?.description || ""}
              </Text>
            </View>
          </ImageBackground>
          <View>
            {(setDetail?.set_exercises || []).map((exercise: any) => (
              <Pressable
                key={exercise._id}
                onPress={() =>
                  // router.push("/home/exercise-plan/exercise-detail")
                  router.push({
                    pathname: "/home/exercise-plan/exercise-detail",
                    params: { exercise_id: exercise.exercise_id, setId: setId },
                  })
                }
              >
                <View className="bg-[#E0FBE2] p-4 my-2 rounded-md flex flex-row justify-between mx-4">
                  <View>
                    <Text className="text-[#176219] font-semibold text-lg">
                      {
                        exerciseDetails.find(
                          (item) => item._id === exercise.exercise_id
                        )?.name
                      }
                    </Text>
                    <Text className="text-[#176219] text-sm">
                      {exercise.description}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-[#176219] font-semibold text-lg">
                      {exercise.estimated_calories_burned} cal
                    </Text>
                    <Text className="text-[#176219] text-sm">
                      {exercise.rest_per_round} sec rest
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DayDetail;
