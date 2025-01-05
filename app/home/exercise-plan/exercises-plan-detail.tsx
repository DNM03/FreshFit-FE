import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { ChevronLeft, Scroll } from "lucide-react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { searchWorkoutPlanDetail } from "~/services/workout-plan-detail";
import { getWorkoutPlanById } from "~/services/workout-plan";

const ExercisesPlanDetail = () => {
  const router = useRouter();
  const [dataIndex, setDataIndex] = React.useState(0);
  const [rawDetails, setRawDetails] = React.useState<any[]>([]);
  const [details, setDetails] = React.useState<any[]>([]);
  const [planDetail, setPlanDetail] = React.useState<any>({});
  const params = useGlobalSearchParams();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const planId = Array.isArray(params?.planId)
          ? params?.planId[0]
          : params?.planId;
        const response = await searchWorkoutPlanDetail(planId, "All");
        setRawDetails(response.result);
        const transformed = Object.values(
          response.result.reduce((acc: any, item: any) => {
            const { week, ...details } = item;
            if (!acc[week]) {
              acc[week] = { week, details: [] };
            }
            acc[week].details.push(details);
            return acc;
          }, {})
        ).map((group: any) => {
          group.details.sort((a: any, b: any) => a.day - b.day);
          return group;
        });

        setDetails(transformed);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchPlan();
  }, [params?.planId]);
  useEffect(() => {
    const fetchPlanDetail = async () => {
      try {
        const planId = Array.isArray(params?.planId)
          ? params?.planId[0]
          : params?.planId;
        const response = await getWorkoutPlanById(planId);
        setPlanDetail(response.workout_plan);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchPlanDetail();
  }, [params?.planId]);

  const handleStartPlan = () => {
    console.log("raw", rawDetails);
    const temp = {
      name: planDetail.name,
      description: planDetail.description,
      number_of_sets: planDetail.number_of_sets,
      estimated_calories_burned: planDetail.estimated_calories_burned,
      type: planDetail.type,
      start_date: planDetail.start_date,
      end_date: planDetail.end_date,
      details: planDetail.details.map((detail: any) => ({
        week: detail.week,
        day: detail.day,
      })),
    };
    console.log(temp);
  };

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
              {params.name || "Exercise Plan Detail"}
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
                {planDetail?.description ||
                  "This exercise plan is designed for beginners who are looking to build strength."}
              </Text>
            </View>
          </ImageBackground>
          <View className="px-4 mt-4">
            <FlatList
              data={details}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable onPress={() => setDataIndex(details.indexOf(item))}>
                  <View
                    className="bg-[#E0E0E0] p-2 ml-4 rounded-md w-36"
                    style={{
                      opacity: dataIndex === details.indexOf(item) ? 1 : 0.5,
                    }}
                  >
                    <Text className="text-[#176219] font-bold text-lg text-center">
                      Week {item?.week}
                    </Text>
                  </View>
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View className="h-1 bg-[#3D6440] w-[100%] my-4 rounded-full"></View>
            <View>
              {(details[dataIndex]?.details || []).map((detail: any) => (
                <Pressable
                  key={detail._id}
                  onPress={() =>
                    router.push({
                      pathname: "/home/exercise-plan/day-detail",
                      params: {
                        workoutId: params.planId,
                        dayId: detail._id,
                        day: detail.day,
                        setId: detail.sets[0]._id,
                        week: details[dataIndex].week,
                      },
                    })
                  }
                >
                  <View className="bg-[#E0FBE2] p-4 my-2 rounded-md flex flex-row justify-between">
                    <View className="inline-flex">
                      <Text className="text-[#176219] font-bold text-lg">
                        Day {detail?.day}
                      </Text>
                      <Text className="text-[#176219] font-normal text-sm">
                        {detail?.sets?.length || 0} sets
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
        <Button className="bg-[#176219] mx-20 mb-20" onPress={handleStartPlan}>
          <Text className="text-[#E0FBE2]">Start Plan</Text>
        </Button>
      </View>
    </View>
  );
};

export default ExercisesPlanDetail;
