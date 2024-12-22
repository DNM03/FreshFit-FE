import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import YoutubePlayer from "react-native-youtube-iframe";

interface StateChangeCallback {
  (state: string): void;
}
const ExerciseDetail = () => {
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
              Push up
            </Text>
          </View>
        </View>
        <ScrollView className="flex-1 px-4 mt-4">
          <View className="flex flex-row items-center">
            <Text className="text-bold text-4xl text-[#176219] font-semibold w-[250px]">
              5 reps
            </Text>
            <Text className="text-sm text-[#176219] font-medium">
              Pushup 5 times
            </Text>
          </View>
          <View className="rounded-lg p-4 mt-4">
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={"WDIpL0pjun0"}
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
              Rest 30s
            </Text>
            <View className="flex justify-center items-center">
              <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={30}
                colors={["#176219", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[7, 5, 2, 0]}
                onComplete={() => {
                  console.log("done");
                  setIsPlaying(false);
                  setIsNext(true);
                }}
              >
                {({ remainingTime }) => <Text>{remainingTime}</Text>}
              </CountdownCircleTimer>
            </View>
          </View>
          <Button className="bg-[#176219] mx-20 mb-20 mt-8" disabled={!isNext}>
            <Text className="text-[#E0FBE2]">Next Exercise</Text>
          </Button>
        </ScrollView>
      </View>
    </View>
  );
};

export default ExerciseDetail;
