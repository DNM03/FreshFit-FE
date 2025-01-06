import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Define the types for the props
interface MyModalProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  message?: string;
  title?: string;
  isCloseButton?: boolean;
  isSubmitButton?: boolean;
  contentStyle?: object; // Custom style for modal content
  titleStyle?: object; // Custom style for title
  messageStyle?: object; // Custom style for message
  buttonStyle?: object; // Custom style for button
  submitButtonStyle?: object; // Custom style for submit button
  closeText?: string; // Custom style for close button text
  submitText?: string; // Custom style for submit button text
}

const MyModal: React.FC<MyModalProps> = ({
  visible,
  onClose,
  onSubmit,
  message,
  title,
  isCloseButton = false,
  isSubmitButton = false,
  contentStyle,
  titleStyle,
  messageStyle,
  buttonStyle,
  submitButtonStyle,
  closeText = "Close",
  submitText = "Submit",
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, contentStyle]}>
          <Text style={[styles.title, titleStyle]}>
            {title || "Modal Title"}
          </Text>
          <Text style={[styles.errorMessage, messageStyle]}>
            {message || "Login failed. Please try again."}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              gap: 10,
            }}
          >
            {isCloseButton && (
              <TouchableOpacity
                style={[styles.button, buttonStyle]}
                onPress={onClose}
              >
                <Text style={styles.buttonTextClose}>
                  {closeText ? closeText : "Close"}
                </Text>
              </TouchableOpacity>
            )}
            {isSubmitButton && (
              <TouchableOpacity
                style={[styles.submitButton, submitButtonStyle]}
                onPress={onSubmit}
              >
                <Text style={styles.buttonText}>
                  {submitText ? submitText : "Submit"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#176219",
    marginBottom: 20,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    flex: 1,
    backgroundColor: "#E0FBE2",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#176219",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#E0FBE2",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextClose: {
    color: "#176219",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MyModal;
