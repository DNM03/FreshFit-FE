import { View, Text, ScrollView, FlatList, Pressable } from "react-native";
import React, { useEffect } from "react";
import { FormInput } from "~/components/ui/form-input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Picker } from "@react-native-picker/picker";
import { Trash } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Label } from "~/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import useMealFormStore from "~/store/useMealFormStore";
import {
  addNewMealPlan,
  deleteMealPlan,
  getMealPlanById,
  updateMealPlan,
} from "~/services/meal";
import LoadingOverlay from "~/components/ui/loading-overlay";

interface DateChangeEvent {
  type: string;
  nativeEvent: any;
}

const CreateMealForm = ({
  isEdit,
  mealId,
}: {
  isEdit?: boolean;
  mealId?: string;
}) => {
  const router = useRouter();
  const [dateOpen, setDateOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [timeOpen, setTimeOpen] = React.useState(false);
  const [time, setTime] = React.useState(new Date());
  const [type, setType] = React.useState("Breakfast");
  const [isLoading, setIsLoading] = React.useState(false);
  const [dishes, setDishes] = React.useState<any[]>([]);
  const mealStore: any = useMealFormStore();

  useEffect(() => {
    if (mealId) {
      setIsLoading(true);
      const fetchMealById = async () => {
        try {
          const response = await getMealPlanById(mealId);
          setDate(new Date(response.meal.date));
          setTime(new Date(response.meal.date));
          setValue("date", response.meal.date);
          setValue("time", response.meal.date);
          setType(response.meal.meal_type);
          setValue("type", response.meal.meal_type);
          reset({
            name: response.meal.name,
            description: response.meal.description,
            preparation_time: response.meal.pre_time.toString(),
            calories: response.meal.calories.toString(),
          });
          // mealStore.updateSection("dishes", response.meal.dishes);
          setDishes((prevDishes: any) => {
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
  }, [mealId]);

  useEffect(() => {
    if (mealStore.mealData.dishes) {
      setDishes((prevDishes: any) => {
        const newDishes = mealStore.mealData.dishes.filter(
          (newDish: any) =>
            !prevDishes.some((prevDish: any) => prevDish._id === newDish._id)
        );
        return [...prevDishes, ...newDishes];
      });
      setValue(
        "calories",
        mealStore.mealData.dishes
          .reduce(
            (total: number, dish: any) => total + parseInt(dish.calories, 10),
            0
          )
          .toString()
      );
      setValue(
        "preparation_time",
        mealStore.mealData.dishes
          .reduce(
            (total: number, dish: any) => total + parseInt(dish.prep_time, 10),
            0
          )
          .toString()
      );
    }
  }, [mealStore]);

  const handleDateChange = (
    event: DateChangeEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setDateOpen(false);
    setDate(currentDate);
    setValue("date", currentDate.toISOString());
    console.log(currentDate.toISOString());
  };
  const handleTimeChange = (
    event: DateChangeEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setTimeOpen(false);
    setTime(currentDate);
    setValue("time", currentDate.toISOString());
    console.log(currentDate.toISOString());
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        description: z.string(),
        // date: z.string(),
        // time: z.string(),
        // type: z.string(),
        preparation_time: z
          .string()
          .min(1, { message: "Preparation time is required" }),
        calories: z.string().min(1, { message: "Calories is required" }),
      })
    ),
    defaultValues: {
      name: "",
      description: "",
      date: new Date().toISOString(),
      time: new Date().toISOString(),
      type: "Breakfast",
      preparation_time: "0",
      calories: "0",
    },
  });
  const calculateDate = (date: Date, time: Date) => {
    const isoDate = date.toISOString().split("T")[0];
    const isoTime = time.toISOString().split("T")[1];
    return new Date(`${isoDate}T${isoTime}`);
  };
  const onSubmit = async (data: any) => {
    // console.log(data);
    // console.log(calculateDate(date, time));
    // console.log(mealStore.mealData.dishes);
    // mealStore.mealData.dishes.forEach((dish: any) => {
    //   dish.ingredients = dish.ingredients?.map((ingredient: any) => ({
    //     ingredientId: ingredient._id,
    //     quantity: ingredient.quantity,
    //     unit: ingredient.unit,
    //   }));
    // });
    setIsLoading(true);
    try {
      const response = await addNewMealPlan({
        name: data.name,
        description: data.description,
        date: calculateDate(date, time),
        meal_type: type,
        pre_time: parseInt(data.preparation_time, 10),
        calories: parseInt(data.calories, 10),
        dishes: mealStore.mealData.dishes,
      });
      router.replace("/home/meal/meals");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const onUpdateSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (mealId) {
        const response = await updateMealPlan(mealId, {
          name: data.name,
          description: data.description,
          date: calculateDate(date, time),
          meal_type: type,
          pre_time: parseInt(data.preparation_time, 10),
          calories: parseInt(data.calories, 10),
          dishes: mealStore.mealData.dishes,
        });
      }
      router.replace("/home/meal/meals");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
  };
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      if (mealId) {
        const response = await deleteMealPlan(mealId);
      }
      router.replace("/home/meal/meals");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        {/* {isEdit && (
          <Button
            className="mt-4 bg-[#176219] "
            // onPress={handleSubmit(onSubmit, onError)}
          >
            <Text className="text-[#E0FBE2]">Done</Text>
          </Button>
        )} */}
        <Controller
          control={control}
          name="name"
          rules={{ required: "This field is required" }}
          render={({ field: { value, onChange } }) => (
            <FormInput
              placeholder="Eg, Salad"
              label="Name"
              value={value}
              onChangeText={onChange}
              errorMessages={errors?.name?.message}
            />
          )}
        />
        <Pressable onPress={() => setDateOpen(true)}>
          <FormInput
            placeholder="Eg, 01/01/2025"
            label="Date"
            readOnly
            value={date.toLocaleDateString()}
          />
        </Pressable>
        {dateOpen && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={handleDateChange}
          />
        )}
        <Pressable onPress={() => setTimeOpen(true)}>
          <FormInput
            placeholder="Eg, 12:00 PM"
            label="Time"
            readOnly
            value={time.toLocaleTimeString()}
          />
        </Pressable>
        {timeOpen && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            is24Hour={true}
            onChange={handleTimeChange}
          />
        )}
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Description</Label>
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <Textarea
                placeholder="Eg, 1 cup of rice"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Label className="text-[#176219] font-medium">Type</Label>
          <View
            style={{ borderRadius: 6, borderWidth: 1, borderColor: "#176219" }}
          >
            <Picker
              selectedValue={type}
              onValueChange={(value) => {
                setType(value);
                setValue("type", value);
              }}
              style={{
                color: "#176219",
                paddingVertical: 0,
              }}
            >
              <Picker.Item
                label="Breakfast"
                value="Breakfast"
                style={{ color: "#176219" }}
              />
              <Picker.Item
                label="Lunch"
                value="Lunch"
                style={{ color: "#176219" }}
              />
              <Picker.Item
                label="Dinner"
                value="Dinner"
                style={{ color: "#176219" }}
              />
            </Picker>
          </View>
        </View>

        <Controller
          control={control}
          name="preparation_time"
          render={({ field: { value, onChange } }) => (
            <FormInput
              placeholder="Eg, 60"
              label="Preparation time (minutes)"
              keyboardType="number-pad"
              value={value}
              onChangeText={onChange}
              errorMessages={errors?.preparation_time?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="calories"
          render={({ field: { value, onChange } }) => (
            <FormInput
              placeholder="Eg, 200"
              label="Calories (cal)"
              keyboardType="number-pad"
              value={value}
              onChangeText={onChange}
              errorMessages={errors?.calories?.message}
            />
          )}
        />
        <View className="flex-1">
          <View className="flex flex-row items-center justify-start">
            <View>
              <Text className="text-[#176219] font-medium">Dishes</Text>
            </View>
            <Button
              className="ml-auto bg-[#176219] "
              onPress={() =>
                router.push({
                  pathname: "/home/meal/dishes",
                  params: { mealId: mealId },
                })
              }
            >
              <Text className="text-[#E0FBE2]">Edit dishes</Text>
            </Button>
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
              data={dishes}
              renderItem={(dish) => (
                <View className="bg-[#E0FBE2] p-2 my-2 rounded-xl flex flex-row items-center justify-between">
                  <View className="flex flex-col ml-2 my-2">
                    <Text className="text-[#176219] text-xl font-semibold">
                      {dish.item.name}
                    </Text>
                    <Text className="text-[#176219] text-lg font-medium">
                      {dish.item.calories} cal
                    </Text>
                  </View>
                  {/* <Trash size={24} color="red" className="" /> */}
                </View>
              )}
            />
          </View>
        </View>
        {!isEdit && (
          <Button
            className="mt-4 bg-[#176219] "
            onPress={handleSubmit(onSubmit, onError)}
          >
            <Text className="text-[#E0FBE2]">Save</Text>
          </Button>
        )}
        {isEdit && (
          <View className="flex flex-row mt-4 justify-between">
            <Button
              className=" bg-[#176219] w-[150px]"
              onPress={handleSubmit(onUpdateSubmit, onError)}
            >
              <Text className="text-[#E0FBE2]">Save</Text>
            </Button>
            <Button
              className=" bg-red-600 w-[150px]"
              style={{ backgroundColor: "#dc2626" }}
              onPress={handleDelete}
            >
              <Text className="text-[#E0FBE2]">Delete</Text>
            </Button>
          </View>
        )}
      </ScrollView>
      <LoadingOverlay visible={isLoading} />
    </View>
  );
};

export default CreateMealForm;
