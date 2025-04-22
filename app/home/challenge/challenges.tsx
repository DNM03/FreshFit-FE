import { View, Text, ScrollView } from "react-native";
import React from "react";
import PlanCard from "~/components/ui/plan-card";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

const Challenges = () => {
  const challenges = [
    {
      id: "674c9551a333bf3b6eb51a32",
      name: "Challenge for beginners",
      type: "Strength",
      level: "Beginner",
      length: "4 weeks",
      isChallenge: true,
    },
    {
      id: "674c95c78085ea7dbbab9963",
      name: "Challenge for intermediate",
      type: "Bodyweight",
      level: "Intermediate",
      length: "5 weeks",
      isChallenge: true,
    },
  ];
  const myChallenges = [
    {
      id: "674c9551a333bf3b6eb51a32",
      name: "Challenge for beginners",
      type: "Strength",
      level: "Beginner",
      length: "4 weeks",
      isChallenge: true,
    },
  ];
  const [value, setValue] = React.useState("system");
  return (
    <ScrollView className="bg-[#FDFDFD] h-screen p-5">
      <View className="flex flex-row items-center">
        <Text className="text-[#176219] text-5xl font-semibold w-[240px]">
          Challenges
        </Text>
        <Picker
          onValueChange={(value) => setValue(value)}
          selectedValue={value}
          style={{
            color: "#176219",
            paddingVertical: 0,
            width: 150,
          }}
        >
          <Picker.Item
            label="System"
            value="system"
            style={{ color: "#176219" }}
          />
          <Picker.Item label="Me" value="me" style={{ color: "#176219" }} />
        </Picker>
      </View>
      <View className="flex flex-col ">
        <FormInput placeholder="Search..." className="w-full" />
        {/* <Button className="bg-[#176219] mx-24">
          <Text className="text-[#E0FBE2]">Recommend</Text>
        </Button> */}
      </View>
      <View>
        {value === "system" &&
          challenges.map((plan, index) => (
            <PlanCard
              key={index}
              name={plan.name}
              type={plan.type}
              length={plan.length}
              estimated_calories_burned={100}
              onProgress={false}
              // isChallenge={plan.isChallenge}
              onPress={() => {
                router.navigate({
                  pathname: "/home/challenge/challenge-overview",
                  params: { id: plan.id },
                });
              }}
            />
          ))}
        {value === "me" && (
          <View>
            {myChallenges.map((plan, index) => (
              <PlanCard
                key={index}
                name={plan.name}
                type={plan.type}
                length={plan.length}
                estimated_calories_burned={100}
                onProgress={true}
                // isChallenge={plan.isChallenge}
                onPress={() => {
                  router.navigate({
                    pathname: "/home/challenge/challenge-overview",
                    params: { id: plan.id, source: "user" },
                  });
                }}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Challenges;
