import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import YoutubePlayer from "react-native-youtube-iframe";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { getSetById } from "~/services/set";
import { getExerciseById } from "~/services/exercises";
interface StateChangeCallback {
  (state: string): void;
}
const ExerciseDetail = () => {
  const params = useGlobalSearchParams();
  console.log("params", params);
  const [setDetail, setSetDetail] = React.useState<any>({});
  const [exerciseDetail, setExerciseDetail] = React.useState<any>();
  const [exerciseId, setExerciseId] = React.useState(
    Array.isArray(params?.exercise_id)
      ? params.exercise_id[0]
      : params?.exercise_id || ""
  );
  const [videoId, setVideoId] = React.useState("");
  useEffect(() => {
    const fetchSetDetail = async () => {
      try {
        if (params?.setId === "") return;
        const response = await getSetById(
          Array.isArray(params?.setId) ? params.setId[0] : params?.setId
        );
        setSetDetail(response.set);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchSetDetail();
  }, [params?.setId]);
  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        const response = await getExerciseById(exerciseId);
        setExerciseDetail(response.exercise);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchExerciseDetails();
  }, [exerciseId, params?.exercise_id]);

  useEffect(() => {
    if (exerciseDetail?.video) {
      const videoId = extractYouTubeId(exerciseDetail?.video);
      console.log("videoId", videoId);
      setVideoId(videoId || "");
    }
  }, [exerciseDetail]);

  function extractYouTubeId(url: string) {
    const match = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    return match ? match[1] : null;
  }

  // const temp = useGlobalSearchParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isNext, setIsNext] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  const onStateChange: StateChangeCallback = React.useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = React.useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const handleNext = () => {
    const currentIndex = setDetail?.set_exercises?.findIndex(
      (item: any) => item.exercise_id === (exerciseDetail?._id || "")
    );
    console.log("currentIndex", currentIndex);
    if (currentIndex < setDetail?.set_exercises?.length - 1) {
      setExerciseId(
        setDetail?.set_exercises[currentIndex + 1]?.exercise_id || ""
      );
      setIsNext(false);
    } else {
      router.navigate("/home/exercise-plan/finish-set");
    }
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
              {exerciseDetail?.name || ""}
            </Text>
          </View>
        </View>
        <ScrollView className="flex-1 px-4 mt-4">
          <View className="flex flex-row items-center">
            <Text className="text-bold text-4xl text-[#176219] font-semibold w-[250px]">
              {
                setDetail?.set_exercises?.find(
                  (item: any) =>
                    item.exercise_id === (exerciseDetail?._id || "")
                ).round
              }{" "}
              rounds
            </Text>
            <Text className="text-sm text-[#176219] font-medium">
              {
                setDetail?.set_exercises?.find(
                  (item: any) =>
                    item.exercise_id === (exerciseDetail?._id || "")
                ).reps
              }{" "}
              reps
            </Text>
          </View>
          <View className="rounded-lg p-4 mt-4">
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={videoId}
              onChangeState={onStateChange}
            />
          </View>
          <Button
            className="bg-[#176219] mx-20 mb-8 mt-8"
            onPress={() => setIsPlaying(true)}
          >
            <Text className="text-[#E0FBE2]">Done</Text>
          </Button>
          <View>
            <Text className="text-center text-[#176219] font-bold text-2xl mb-4">
              Rest{" "}
              {
                setDetail?.set_exercises?.find(
                  (item: any) =>
                    item.exercise_id === (exerciseDetail?._id || "")
                ).rest_per_round
              }
              s
            </Text>
            <View className="flex justify-center items-center">
              <CountdownCircleTimer
                key={exerciseDetail?._id || ""}
                isPlaying={isPlaying}
                duration={
                  setDetail?.set_exercises?.find(
                    (item: any) =>
                      item.exercise_id === (exerciseDetail?._id || "")
                  ).rest_per_round || 5
                }
                colors={["#176219", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[7, 5, 2, 0]}
                onComplete={() => {
                  setIsPlaying(false);
                  setIsNext(true);
                }}
              >
                {({ remainingTime }) => <Text>{remainingTime}</Text>}
              </CountdownCircleTimer>
            </View>
          </View>
          <Button
            className="bg-[#176219] mx-20 mb-20 mt-8"
            disabled={!isNext}
            onPress={handleNext}
          >
            <Text className="text-[#E0FBE2]">Next Exercise</Text>
          </Button>
        </ScrollView>
      </View>
    </View>
  );
};

export default ExerciseDetail;
