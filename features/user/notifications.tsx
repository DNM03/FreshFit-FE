import { View, Text, Modal, ScrollView } from "react-native";
import React from "react";
import { ChevronLeft } from "lucide-react-native";

type NotificationsProps = {
  //   visible: boolean;
  onClose: () => void;
};

const Notifications = ({ onClose }: NotificationsProps) => {
  const notifications = [
    {
      title: "New Challenge",
      description: "You have a new challenge",
      time: "2 hours ago",
      isRead: false,
    },
    {
      title: "New Challenge",
      description: "You have a new challenge",
      time: "2 hours ago",
      isRead: false,
    },
    {
      title: "New Challenge",
      description: "You have a new challenge",
      time: "2 hours ago",
      isRead: false,
    },
    {
      title: "New Challenge",
      description: "You have a new challenge",
      time: "2 hours ago",
      isRead: true,
    },
  ];
  return (
    <Modal>
      <View className="flex flex-row items-center justify-between w-full">
        <ChevronLeft size={24} color="#176219" onPress={onClose} />
        <Text className="text-[#176219] text-2xl font-medium">
          Notifications
        </Text>
        <View className="ml-4 w-[24px]"></View>
      </View>
      <ScrollView className="px-4">
        {notifications.map((notification, index) => (
          <View
            key={index}
            className="flex flex-row items-center justify-between px-4 mt-4 bg-[#E0FBE2] p-2 rounded-md relative"
            style={{ paddingRight: 34 }}
          >
            <View>
              <Text className="text-[#176219] text-lg font-semibold">
                {notification.title}
              </Text>
              <Text className="text-[#176219] text-lg">
                {notification.description}
              </Text>
            </View>
            <Text className="text-[#176219] text-lg">{notification.time}</Text>
            {!notification.isRead && (
              <View
                className="rounded-full bg-[#176219] absolute right-2"
                style={{ width: 6, height: 6 }}
              ></View>
            )}
          </View>
        ))}
      </ScrollView>
    </Modal>
  );
};

export default Notifications;
