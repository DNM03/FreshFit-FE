import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const CreateChallengeDetail = () => {
  const router = useRouter();
  const [value, setValue] = React.useState("excercise");

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
              Create Challenge
            </Text>
          </View>
        </View>
        <View>
          <Tabs value={value} onValueChange={setValue}>
            <TabsList className="flex-row w-full">
              <TabsTrigger value="exercise" className="flex-1">
                <Text>Exercise</Text>
              </TabsTrigger>
              <TabsTrigger value="diet" className="flex-1">
                <Text>Diet</Text>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="exercise">
              <Text>Exercise</Text>
            </TabsContent>
            <TabsContent value="diet">
              <Text>Diet</Text>
            </TabsContent>
          </Tabs>
        </View>
      </View>
    </View>
  );
};

export default CreateChallengeDetail;
