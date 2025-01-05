import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Picker } from "@react-native-picker/picker";
import { Button } from "~/components/ui/button";
import { Trash } from "lucide-react-native";
import { useRouter } from "expo-router";
import { getDishIngredientDetail } from "~/services/dish";
import useMealFormStore from "~/store/useMealFormStore";

const CreateDishForm = (data: any) => {
  const router = useRouter();
  const [ingredients, setIngredients] = React.useState<any[]>([]);
  const [currentData, setCurrentData] = React.useState<any>(data.data);
  useEffect(() => {
    setCurrentData(data.data);
    if (data?.data?._id !== currentData._id) {
      setIngredients([]);
      const fetchIngredientsDetail = async (ingredientId: string) => {
        try {
          const response = await getDishIngredientDetail(
            data?.data?._id,
            ingredientId
          );
          setIngredients((prev) => [...prev, response.dish_ingredient]);
        } catch (error) {
          console.log(error);
        }
      };
      data.data?.ingredients?.forEach(async (element: any) => {
        console.log(element._id);
        await fetchIngredientsDetail(element._id);
      });
    }
  }, [data]);
  const mealStore: any = useMealFormStore();
  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <FormInput
          placeholder="Eg, Beefsteak"
          label="Name"
          readOnly
          value={data.data.name || ""}
        />
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Description</Label>
          <Textarea
            placeholder="Eg, 1 cup of rice"
            readOnly
            value={data.data?.description || ""}
          />
        </View>
        <FormInput
          placeholder="Eg, 200"
          label="Calories (cal)"
          readOnly
          value={data.data?.calories?.toString() || ""}
        />
        <FormInput
          placeholder="Eg, 60"
          label="Preparation time (minutes)"
          readOnly
          value={data.data?.prep_time?.toString() || ""}
        />
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Image</Label>

          <View
            className="p-4 mt-4"
            style={{
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "#176219",
              height: 200,
            }}
          >
            {data.data.image && (
              <Image
                source={{ uri: data.data.image }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Instructions</Label>
          <Textarea
            placeholder="Eg, 1 cup of rice"
            readOnly
            value={data.data?.instruction || ""}
          />
        </View>

        <View className="flex-1">
          <View className="flex flex-row items-center justify-start">
            <View>
              <Text className="text-[#176219] font-medium">Ingredients</Text>
            </View>
            {/* <Button
              className="ml-auto bg-[#176219] "
              onPress={() => router.navigate("/home/meal/create-ingredient")}
            >
              <Text className="text-[#E0FBE2]">Edit Ingredient</Text>
            </Button> */}
          </View>
          <View
            className="p-4 mt-4"
            style={{
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "#176219",
              height: 200,
            }}
          >
            <FlatList
              nestedScrollEnabled
              data={ingredients || []}
              renderItem={(ingredient: any) => {
                // console.log(ingredient);
                return (
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/home/meal/create-ingredient",
                        params: {
                          ingredientId: ingredient.item.ingredient?._id,
                        },
                      })
                    }
                  >
                    <View className="bg-[#E0FBE2] p-2 my-2 rounded-xl flex flex-row items-center justify-between">
                      <View className="flex flex-col ml-2 my-2">
                        <Text className="text-[#176219] text-xl font-semibold">
                          {ingredient.item.ingredient?.name || ""}
                        </Text>
                        <Text className="text-[#176219] text-lg font-medium">
                          {ingredient.item.ingredient?.calories?.toString() ||
                            ""}{" "}
                          cal
                        </Text>
                      </View>
                      <Text className="text-[#176219] text-lg font-medium">
                        {ingredient?.item?.quantity?.toString() || ""}{" "}
                        {ingredient?.item?.unit?.toString() || ""}
                      </Text>
                      {/* <Trash size={24} color="red" className="" /> */}
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 16, marginTop: 16 }}>
          <Label className="text-[#176219] font-medium">Rating</Label>
          <View
            style={{ borderRadius: 6, borderWidth: 1, borderColor: "#176219" }}
          >
            <Picker
              onValueChange={(value) => console.log(value)}
              style={{
                color: "#176219",
                paddingVertical: 0,
              }}
            >
              <Picker.Item
                label="1 Star"
                value="1"
                style={{ color: "#176219" }}
              />
              <Picker.Item
                label="2 Stars"
                value="2"
                style={{ color: "#176219" }}
              />
              <Picker.Item
                label="3 Stars"
                value="3"
                style={{ color: "#176219" }}
              />
              <Picker.Item
                label="4 Stars"
                value="4"
                style={{ color: "#176219" }}
              />
              <Picker.Item
                label="5 Stars"
                value="5"
                style={{ color: "#176219" }}
              />
            </Picker>
          </View>
        </View>
        <Button
          className="mt-4 bg-[#176219] "
          onPress={() => {
            const currentDishes = mealStore.mealData.dishes || [];
            const newDishes = [
              ...currentDishes.filter(
                (dish: any) => dish._id !== data.data._id
              ),
              data.data,
            ];
            mealStore.updateSection("dishes", newDishes);
            router.back();
          }}
        >
          <Text className="text-[#E0FBE2]">Add to meal</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default CreateDishForm;
