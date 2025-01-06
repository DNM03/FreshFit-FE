import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormInput } from "~/components/ui/form-input";
import { Button } from "~/components/ui/button";
import { Picker } from "@react-native-picker/picker";
import { authService } from "~/services/auth";
const EditUserForm = (onClose: any) => {
  const [name, setName] = useState("John");
  const [dateOfBirth, setDateOfBirth] = useState(new Date("2003-10-20"));
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("80");
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState("jonh@doe@mail.com");

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleSave = async () => {
    const formData = {
      fullname: name,
      date_of_birth: dateOfBirth.toISOString(), // Format date
      height: parseInt(height),
      weight: parseInt(weight),
      gender,
    };
    console.log("formData", formData);

    try {
      const response = await authService.updateInfo(formData);
      if (response) {
        console.log("Navigating to home:", response.data);
        onClose();
      }
    } catch (err: any) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <View className="flex-1 px-8 mt-4">
      <ScrollView style={{ marginBottom: 20 }} nestedScrollEnabled>
        <View className="flex items-center justify-center">
          <Image
            source={require("~/assets/images/avatar_placeholder.png")}
            className="w-32 h-32 rounded-full"
          />
        </View>
        <FormInput
          placeholder="Eg, John Doe"
          label="Name"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
          <FormInput
            placeholder="Select Date of Birth"
            label="Date of Birth"
            value={dateOfBirth.toISOString().split("T")[0]}
            editable={false} // Prevent manual editing
          />
        </TouchableOpacity>

        {/* DateTimePicker for selecting the date */}
        {isDatePickerVisible && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setDateOfBirth(selectedDate);
              }
              setIsDatePickerVisible(false);
            }}
          />
        )}

        <FormInput
          keyboardType="numeric"
          placeholder="Eg, 6'2"
          label="Height"
          value={height}
          onChangeText={setHeight}
        />
        <FormInput
          keyboardType="numeric"
          placeholder="Eg, 80"
          label="Weight"
          value={weight}
          onChangeText={setWeight}
        />
        <View style={{ marginTop: -5, marginBottom: 10 }}>
          <Text
            style={{
              color: "#176219",
              fontSize: 14,
              marginBottom: 2,
              fontWeight: "600",
            }}
          >
            Gender
          </Text>
          <View
            style={{ borderWidth: 1, borderColor: "#176219", borderRadius: 5 }}
          >
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={{
                height: 50,
                width: "100%",
                borderWidth: 2,
                borderColor: "#176219",
                paddingLeft: 10,
              }}
            >
              <Picker.Item label="Male" value={0} />
              <Picker.Item label="Female" value={1} />
            </Picker>
          </View>
        </View>

        {/* <FormInput
          placeholder="Eg, jonh@doe@mail.com"
          label="Email"
          value={email}
          onChangeText={setEmail}
        /> */}
      </ScrollView>
      <Button
        style={{ marginBottom: 15 }}
        className="mt-4 bg-[#176219]"
        onPress={handleSave}
      >
        <Text className="text-[#E0FBE2]">Save</Text>
      </Button>
    </View>
  );
};

export default EditUserForm;
