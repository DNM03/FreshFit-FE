import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { ChevronLeft } from "lucide-react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import CreateDishForm from "~/features/meal/create-dish-form";
import { searchDish } from "~/services/dish";

const CreateDish = () => {
  const router = useRouter();
  const [dishes, setDishes] = React.useState<any[]>([]);
  const [dishData, setDishData] = React.useState<any>({});
  const params = useGlobalSearchParams();
  const [selectedDish, setSelectedDish] = React.useState<any>(
    params?.dishId || null
  );
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await searchDish("", 1, 100);
        setDishes(response.result.dishes);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchDishes();
  }, []);
  useEffect(() => {
    if (selectedDish) {
      const dish = dishes.find((dish: any) => dish._id === selectedDish);
      if (dish) {
        setDishData({
          _id: dish._id,
          name: dish.name,
          description: dish.description,
          calories: dish.calories,
          prep_time: dish.prep_time,
          rating: dish.rating,
          image: dish.image,
          user_id: dish.user_id,
          instruction: dish.instruction,
          created_at: dish.created_at,
          updated_at: dish.updated_at,
          ingredients: dish?.ingredients || [],
        });
      }
    }
  }, [selectedDish, params, dishes]);
  return (
    <View className="bg-[#FDFDFD] h-screen flex-1">
      <View className="flex flex-row justify-center items-center w-full pt-2 relative  px-2">
        <Pressable
          onPress={() => router.back()}
          className="absolute left-0 top-1/3"
        >
          <ChevronLeft size={32} color="#176219" className="" />
        </Pressable>
        <View className="  ">
          <Text className="text-[#176219] font-semibold text-2xl">
            Dish Detail
          </Text>
        </View>
      </View>
      <View
        style={{ borderRadius: 6, borderWidth: 1, borderColor: "#176219" }}
        className="m-5"
      >
        <Picker
          selectedValue={selectedDish}
          onValueChange={(value) => setSelectedDish(value)}
          style={{
            color: "#176219",
            paddingVertical: 0,
          }}
        >
          <Picker.Item label="None" value="" style={{ color: "#176219" }} />
          {dishes.map((dish) => (
            <Picker.Item
              key={dish._id}
              label={dish.name}
              value={dish._id}
              style={{ color: "#176219" }}
            />
          ))}
        </Picker>
      </View>
      <ScrollView className="flex-1 px-5">
        <CreateDishForm data={dishData} />
      </ScrollView>
    </View>
  );
};

export default CreateDish;
