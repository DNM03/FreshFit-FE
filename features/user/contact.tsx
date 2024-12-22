import { View, Text, Modal } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";
import ContactForm from "./contact-form";

type ContactProps = {
  //   visible: boolean;
  onClose: () => void;
};

const Contact = ({ onClose }: ContactProps) => {
  return (
    <Modal>
      <View className="flex flex-row items-center justify-between w-full">
        <ChevronLeft size={24} color="#176219" onPress={onClose} />
        <Text className="text-[#176219] text-2xl font-medium">Contact</Text>
        <View className="ml-4 w-[24px]"></View>
      </View>
      <ContactForm />
    </Modal>
  );
};

export default Contact;
