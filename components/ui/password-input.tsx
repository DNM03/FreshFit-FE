import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Icon library
import { cn } from "~/lib/utils";

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  onChangeText,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <>
      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
          className={cn(
            "web:flex h-10 native:h-12 web:w-full rounded-md  border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-[#ACE1AF] web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
            "w-full border-b border-[#ACE1AF] py-2 px-4 focus:outline-none focus:border-[#176219] text-[#176219] text-lg"
          )}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <MaterialIcons
            name={isPasswordVisible ? "visibility" : "visibility-off"}
            size={24}
            color="#176219"
          />
        </TouchableOpacity>
      </View>
      {error && (
        <Text
          style={{ marginTop: -10, marginLeft: 14, marginBottom: -10 }}
          className="text-red-500 text-sm"
        >
          {error} {/* Display error message below the input */}
        </Text>
      )}
    </>
  );
};

export default PasswordInput;
