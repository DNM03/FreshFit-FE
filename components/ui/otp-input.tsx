import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

interface OTPInputProps {
  codeLength?: number;
  onCodeFilled?: (code: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  codeLength = 4,
  onCodeFilled,
}) => {
  const [code, setCode] = useState<string[]>(Array(codeLength).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleTextChange = (text: string, index: number) => {
    console.log("code:", code);
    const newCode = [...code];
    newCode[index] = text;

    if (text && index < codeLength - 1) {
      inputs.current[index + 1]?.focus();
    }

    setCode(newCode);
    onCodeFilled?.(newCode.join(""));

    // if (newCode.every((digit) => digit !== "")) {
    //   onCodeFilled?.(newCode.join(""));
    // }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (event.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: codeLength }).map((_, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={code[index]}
          onChangeText={(text) => handleTextChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          ref={(ref) => (inputs.current[index] = ref)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "#ACE1AF",
    width: 50,
    height: 50,
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: 5,
    borderRadius: 5,
    color: "#176219",
  },
});

export default OTPInput;
