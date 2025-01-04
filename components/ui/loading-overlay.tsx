import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet, Text } from "react-native";

const LoadingOverlay = ({
  visible,
  message = "Loading...",
}: {
  visible?: boolean;
  message?: string;
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoadingOverlay;
