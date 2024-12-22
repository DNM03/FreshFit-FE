import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";
import { Progress } from "~/components/ui/progress";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateChangeEvent {
  type: string;
  nativeEvent: any;
}
const DateOfBirth = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onChange = (
    event: DateChangeEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setOpen(false);
    setDate(currentDate);
  };
  return (
    <View className="flex-1 items-center justify-center bg-[#E0FBE2]">
      <Text className="text-[#176219] text-4xl font-bold mb-8">
        Date Of Birth?
      </Text>
      <Text className="text-[#176219] text-5xl font-semibold">
        {date.toLocaleDateString()}
      </Text>
      <Button
        className="bg-[#176219]  mx-10 mt-4"
        onPress={() => setOpen(true)}
      >
        <Text className="text-[#E0FBE2]">Choose date</Text>
      </Button>
      {open && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <View className="flex flex-row mt-8">
        <Button
          className="bg-white  mx-10 mt-4 w-[150px]"
          size="lg"
          onPress={() => router.back()}
        >
          <Text className="text-[#176219]">Back</Text>
        </Button>
        <Button
          className="bg-[#176219]  mx-10 mt-4 w-[150px]"
          size="lg"
          onPress={() => router.push("/auth/height")}
        >
          <Text className="text-[#E0FBE2]">Next</Text>
        </Button>
      </View>
      <View className="px-8 w-full mt-8">
        <Progress value={30} max={5} className="text-[#176219]" />
      </View>
    </View>
  );
};

export default DateOfBirth;
