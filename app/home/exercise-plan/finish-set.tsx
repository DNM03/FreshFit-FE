import { View, Text, Image } from "react-native";
import React from "react";
import { Button } from "~/components/ui/button";

const FinishSet = () => {
  return (
    <View>
      <Text className="text-3xl text-[#176219]">You did it!</Text>

      <View>
        <Image src={require("~/assets/images/cup.png")} />
      </View>

      <Button>
        <Text>Go back to plan</Text>
      </Button>
    </View>
  );
};

export default FinishSet;
