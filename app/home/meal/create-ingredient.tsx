import { View, Text, Pressable, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import CreateIngredientForm from "~/features/meal/create-ingredient-form";
import { Button } from "~/components/ui/button";
import ImagePickerModal from "~/features/image-picker";
import { getDetection } from "~/services/image-detection";
import LoadingOverlay from "~/components/ui/loading-overlay";
import { searchIngredient } from "~/services/ingredient";

const CreateIngredient = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();

  console.log(params);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [image, setImage] = useState<string | null>(null);
  // const [detectionResult, setDetectionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState(
    params?.ingredientId || ""
  );
  const [ingredientData, setIngredientData] = useState<any>({
    name: "",
    description: "",
    calories: 0,
    carbohydrate: 0,
    sodium: 0,
    sugar: 0,
    cholesterol: 0,
    fat: 0,
  });
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await searchIngredient("", 1, 100);
        setIngredients(response.result.ingredients);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchIngredients();
  }, []);
  useEffect(() => {
    if (selectedIngredient) {
      const ingredient = ingredients.find(
        (ingredient: any) => ingredient._id === selectedIngredient
      );
      if (ingredient) {
        setIngredientData({
          name: ingredient.name,
          description: ingredient.description,
          calories: ingredient.calories,
          carbohydrate: ingredient.cab,
          sodium: ingredient.sodium,
          sugar: ingredient.sugar,
          cholesterol: ingredient.cholesterol,
          fat: ingredient.fat,
          image: ingredient.image,
        });
      }
    }
  }, [selectedIngredient, params, ingredients]);
  // const handleImageSelected = async (uri: string) => {
  //   setImage(uri);
  //   setIsLoading(true);
  //   try {
  //     const result = await getDetection(uri);
  //     setDetectionResult(result);
  //     console.log(result);
  //   } catch (error) {
  //     console.log("Error", "Failed to analyze image");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
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
            Ingredient Detail
          </Text>
        </View>
      </View>
      <View
        style={{ borderRadius: 6, borderWidth: 1, borderColor: "#176219" }}
        className="m-5"
      >
        <Picker
          selectedValue={selectedIngredient}
          onValueChange={(value) => setSelectedIngredient(value)}
          style={{
            color: "#176219",
            paddingVertical: 0,
          }}
        >
          <Picker.Item label="None" value="" style={{ color: "#176219" }} />
          {ingredients.map((ingredient: any) => (
            <Picker.Item
              key={ingredient._id}
              label={ingredient.name}
              value={ingredient._id}
              style={{ color: "#176219" }}
            />
          ))}
        </Picker>
      </View>
      {/* <Button
        className="bg-[#176219] mx-24 mb-4"
        onPress={() => {
          console.log("Scan");
          setModalVisible(true);
        }}
      >
        <Text className="text-[#E0FBE2]">Scan</Text>
      </Button> */}
      {/* <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onImageSelected={handleImageSelected}
      /> */}
      <ScrollView className="flex-1 px-5">
        <CreateIngredientForm data={ingredientData} />
      </ScrollView>
      <LoadingOverlay visible={isLoading} />
    </View>
  );
};

export default CreateIngredient;
