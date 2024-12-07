import { useRouter } from "expo-router";
import * as React from "react";
import { Text, View, Image } from "react-native";
import { Button } from "~/components/ui/button";

export default function Screen() {
  const router = useRouter();

  const handleNavigate = () => {
    router.navigate("/auth/login");
  };

  return (
    <View className="flex flex-col justify-around bg-[#E0FBE2] h-screen">
      <View className="px-16 mt-20">
        <Text className="text-[#176219] text-5xl font-bold">Welcome</Text>
        <Text className="text-[#176219] text-lg">
          We're glad that you are here
        </Text>
      </View>
      <View className="px-32 py-10 my-20">
        <Button className="bg-[#176219]" size="lg" onPress={handleNavigate}>
          <Text className="text-[#E0FBE2] text-lg">Let's get started</Text>
        </Button>
      </View>
      <View>
        <Image source={require("~/assets/images/healthy-food.png")} />
      </View>
    </View>
  );
}
