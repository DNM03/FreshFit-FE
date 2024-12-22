import { View, Text, Modal, ScrollView, Dimensions } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

const Report = ({ onClose }: { onClose: () => void }) => {
  const caloriesBurnedFirst6Months = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
    ],
  };
  const caloriesBurnedLast6Months = {
    labels: ["July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
    ],
  };
  const caloriesTakenFirst6Months = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
    ],
  };
  const caloriesTakenLast6Months = {
    labels: ["July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      },
    ],
  };
  return (
    <Modal>
      <View className="flex flex-row items-center justify-between w-full">
        <ChevronLeft size={24} color="#176219" onPress={onClose} />
        <Text className="text-[#176219] text-2xl font-medium">Report</Text>
        <View className="ml-4 w-[24px]"></View>
      </View>
      <ScrollView className="flex-1 px-4">
        <Text className="font-semibold text-[#176219]">
          Calories Burned in first 6 months
        </Text>
        <LineChart
          data={caloriesBurnedFirst6Months}
          width={380}
          height={220}
          yAxisLabel="Cal "
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 32,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          //   chartConfig={chartConfig}
        />
        <Text className="font-semibold text-[#176219] mt-4">
          Calories Burned in last 6 months
        </Text>
        <LineChart
          data={caloriesBurnedLast6Months}
          width={380}
          height={220}
          yAxisLabel="Cal "
          chartConfig={{
            backgroundColor: "#f26a00",
            backgroundGradientFrom: "#60ab84",
            backgroundGradientTo: "#7cdeab",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 32,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          //   chartConfig={chartConfig}
        />
        <Text className="font-semibold text-[#176219] mt-4">
          Calories Taken in first 6 months
        </Text>
        <BarChart
          data={caloriesTakenFirst6Months}
          width={380}
          height={220}
          yAxisLabel="Cal "
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#f26a00",
            backgroundGradientFrom: "#b04555",
            backgroundGradientTo: "#d96c7d",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 32,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          //   chartConfig={chartConfig}
        />
        <Text className="font-semibold text-[#176219] mt-4">
          Calories Taken in last 6 months
        </Text>
        <BarChart
          data={caloriesTakenLast6Months}
          width={380}
          height={220}
          yAxisLabel="Cal "
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#f26a00",
            backgroundGradientFrom: "#484eab",
            backgroundGradientTo: "#6e73c4",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 32,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          //   chartConfig={chartConfig}
        />
      </ScrollView>
    </Modal>
  );
};

export default Report;
