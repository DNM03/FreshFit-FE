import React from "react";
import { View, Modal, Text, Pressable } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Button } from "~/components/ui/button";
import { Focus, Images } from "lucide-react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (uri: string) => void;
}

function ImagePickerModal({ visible, onClose, onImageSelected }: Props) {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasCameraPermission(cameraStatus.status === "granted");
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);
  const pickImage = async () => {
    if (!hasGalleryPermission) {
      console.log("Permission needed");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
      onClose();
    }
  };

  const takePhoto = async () => {
    if (!hasCameraPermission) {
      console.log("Camera permission needed");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={onClose} style={{ padding: 8 }}>
          <Pressable>
            <View
              className="bg-white p-4"
              style={{ backgroundColor: "#E0FBE2", borderRadius: 10 }}
            >
              <Text className="text-center text-2xl font-bold mb-4">
                Select Image
              </Text>
              <View
                className="flex-row justify-around mb-4"
                style={{ gap: 40, marginHorizontal: 40 }}
              >
                <Button
                  onPress={takePhoto}
                  className="bg-[#176219]"
                  style={{ width: 100, height: 100 }}
                >
                  <Focus size={32} color="#E0FBE2" />
                  <Text className="text-[#E0FBE2]">Camera</Text>
                </Button>
                <Button
                  onPress={pickImage}
                  className="bg-[#176219]"
                  style={{ width: 100, height: 100 }}
                >
                  <Images size={32} color="#E0FBE2" />
                  <Text className="text-[#E0FBE2]">Gallery</Text>
                </Button>
              </View>
              <Button onPress={onClose} className="bg-gray-300">
                <Text>Cancel</Text>
              </Button>
            </View>
          </Pressable>
        </Pressable>
      </View>
    </Modal>
  );
}
export default ImagePickerModal;
