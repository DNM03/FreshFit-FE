import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Trash } from "lucide-react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getRecommendedDishes, searchDish } from "~/services/dish";
import { debounce } from "~/utils/debounce";
import ImagePickerModal from "~/features/image-picker";
import { getDetection } from "~/services/image-detection";
import LoadingOverlay from "~/components/ui/loading-overlay";
import useMealFormStore from "~/store/useMealFormStore";
import { getMealPlanById } from "~/services/meal";

const Dishes = () => {
  const router = useRouter();
  const [dishes, setDishes] = React.useState([]);
  const [userDishes, setUserDishes] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState("");
  const mealStore: any = useMealFormStore();
  const [detectionResult, setDetectionResult] = useState<any>("");

  const params = useGlobalSearchParams();
  useEffect(() => {
    if (params.mealId) {
      setIsLoading(true);
      const fetchMealById = async () => {
        try {
          const response = await getMealPlanById(
            Array.isArray(params.mealId) ? params.mealId[0] : params.mealId
          );
          setUserDishes((prevDishes: any) => {
            const newDishes = response.meal.dishes.filter(
              (newDish: any) =>
                !prevDishes.some(
                  (prevDish: any) => prevDish._id === newDish._id
                )
            );
            return [...prevDishes, ...newDishes];
          });
        } catch (error) {
          console.log("Error", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMealById();
    }
  }, [params]);
  useEffect(() => {
    if (mealStore.mealData.dishes) {
      console.log("store", mealStore.mealData.dishes);
      setUserDishes((prevDishes: any) => {
        const newDishes = mealStore.mealData.dishes.filter(
          (newDish: any) =>
            !prevDishes.some((prevDish: any) => prevDish._id === newDish._id)
        );
        return [...prevDishes, ...newDishes];
      });
    }
  }, [mealStore]);
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
    const fetchDishes = async () => {
      try {
        const response = await searchDish(search, 1, 100);
        setDishes(response.result.dishes);
      } catch (error) {
        console.log("Error", error);
      }
    };

    const debouncedFetchDishes = debounce(fetchDishes, 300);
    debouncedFetchDishes();
  }, [search]);
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await searchDish(detectionResult, 1, 100);
        setDishes(response.result.dishes);
      } catch (error) {
        console.log("Error", error);
      }
    };

    const debouncedFetchDishes = debounce(fetchDishes, 300);
    debouncedFetchDishes();
  }, [detectionResult]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = React.useState("me");
  const [image, setImage] = useState<string | null>(null);
  const handleImageSelected = async (uri: string) => {
    setImage(uri);
    setIsLoading(true);
    try {
      const result = await getDetection(uri);
      setDetectionResult(result.predicted_class);
    } catch (error) {
      console.log("Error", "Failed to analyze image");
    } finally {
      setIsLoading(false);
    }
  };
  const handleRecommend = async () => {
    setIsLoading(true);
    try {
      const response = await getRecommendedDishes({
        number_of_dishes: 5,
        number_of_candidates: 1,
        activity_level: "active",
        current_weight: 70,
        desired_weight: 75,
        height: 175,
        age: 22,
        gender: "Male",
      });
      // console.log(response.result.recommendations[0]);
      setDishes(response.result.recommendations[0]);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-[#FDFDFD] h-screen flex-1 ">
      <View className="flex flex-row justify-center items-center w-full pt-2 relative mb-4">
        <Pressable
          onPress={() => router.back()}
          className="absolute left-0 top-1/3"
        >
          <ChevronLeft size={32} color="#176219" className="" />
        </Pressable>
        <View className="  ">
          <Text className="text-[#176219] font-semibold text-2xl">Dishes</Text>
        </View>
      </View>

      <Tabs
        value={value}
        onValueChange={(value) => setValue(value)}
        className="px-4"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="me" className="flex-1">
            <Text>Me</Text>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex-1">
            <Text>System</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="me">
          <Button
            className="bg-[#176219] mx-20 my-4"
            onPress={() => {
              // mealStore.resetForm();
              router.back();
            }}
          >
            <Text className="text-[#E0FBE2]">Save</Text>
          </Button>
          {userDishes.map((dish: any) => (
            <Pressable
              key={dish._id}
              onPress={() =>
                router.push({
                  pathname: "/home/meal/create-dish",
                  params: { dishId: dish._id },
                })
              }
            >
              <View className="flex flex-row justify-between items-center p-5 bg-[#E0FBE2] m-2 mx-4 rounded-lg">
                <View className="flex flex-col ">
                  <Text className="text-[#176219] font-medium text-2xl">
                    {dish.name}
                  </Text>
                  <Text className="text-[#176219] font-medium">
                    {dish.calories?.toString()} cal
                  </Text>
                </View>
                {/* <Trash size={24} color="red" className="" /> */}
              </View>
            </Pressable>
          ))}
        </TabsContent>
        <TabsContent value="system">
          <View className="flex flex-col   p-5">
            <FormInput
              placeholder="Search..."
              className="w-full"
              value={search}
              onChangeText={setSearch}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingHorizontal: 40,
                gap: 20,
              }}
            >
              <Button
                className="bg-[#176219] w-[150px]"
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-[#E0FBE2]">Scan</Text>
              </Button>
              <Button
                className="bg-[#E0FBE2] w-[150px]"
                onPress={() => handleRecommend()}
              >
                <Text className="text-[#176219]">Recommend</Text>
              </Button>
            </View>
          </View>
          <ScrollView>
            {dishes.map((dish: any) => (
              <Pressable
                key={dish._id}
                onPress={() =>
                  router.push({
                    pathname: "/home/meal/create-dish",
                    params: { dishId: dish._id },
                  })
                }
              >
                <View className="flex flex-row justify-between items-center p-5 bg-[#E0FBE2] m-2 mx-4 rounded-lg">
                  <View className="flex flex-col ">
                    <Text className="text-[#176219] font-medium text-2xl">
                      {dish.name}
                    </Text>
                    <Text className="text-[#176219] font-medium">
                      {dish.calories?.toString()} cal
                    </Text>
                  </View>
                  {/* <Trash size={24} color="red" className="" /> */}
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <ImagePickerModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onImageSelected={handleImageSelected}
          />
        </TabsContent>
      </Tabs>
      <LoadingOverlay visible={isLoading} />
    </View>
  );
};

export default Dishes;
