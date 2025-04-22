import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React from "react";
import {
  Bell,
  Bolt,
  Goal,
  LogOut,
  UserRound,
  Shield,
  Clipboard,
  Notebook,
} from "lucide-react-native";
import Preferences from "~/features/user/preferences";
import Notifications from "~/features/user/notifications";
import { router } from "expo-router";
import GoalWeight from "~/features/user/goal-weight";
import Contact from "~/features/user/contact";
import AccountInformation from "~/features/user/account-information";
import Report from "~/features/user/report";
import { authService } from "~/services/auth";
import { getProfile } from "~/services/user";
import FitnessProfile from "~/features/user/fitness-profile";

const User = () => {
  const [modalVisibale, setModalVisible] = React.useState(-1);
  const [user, setUser] = React.useState<any>(null);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfile();
        setUser(response.result);
        setRefresh(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [refresh]);
  const handleLogout = async () => {
    await authService.logout();
    router.replace("/auth/login");
  };
  return (
    <ScrollView className="bg-[#FDFDFD] h-screen p-5">
      {modalVisibale === 1 && (
        <Preferences
          onClose={() => {
            setModalVisible(-1);
            setRefresh(true);
          }}
          myNotifySettings={user?.myNotifySettings}
        />
      )}
      {modalVisibale === 2 && (
        <Notifications onClose={() => setModalVisible(-1)} />
      )}
      {modalVisibale === 3 && (
        <GoalWeight
          onClose={() => {
            setModalVisible(-1);
            setRefresh(true);
          }}
          goalWeight={user?.goal_weight}
          setRefresh={setRefresh}
        />
      )}
      {modalVisibale === 4 && (
        <FitnessProfile
          onClose={() => {
            setModalVisible(-1);
            setRefresh(true);
          }}
        />
      )}
      {modalVisibale === 5 && (
        <AccountInformation
          onClose={() => {
            setModalVisible(-1);
            setRefresh(true);
          }}
        />
      )}
      {modalVisibale === 6 && <Report onClose={() => setModalVisible(-1)} />}
      {modalVisibale === 7 && <Contact onClose={() => setModalVisible(-1)} />}
      <Text className="text-[#176219] text-5xl font-semibold">Profile</Text>
      <View className="flex flex-row px-2">
        <View>
          <Image
            source={require("~/assets/images/avatar_placeholder.png")}
            className="w-32 h-32 rounded-full"
          />
        </View>
        <View className="ml-8">
          <Text className="text-[#176219] font-bold text-2xl">
            {user?.fullName || "User"}
          </Text>
          <Text className="text-[#176219] font-semibold text-xl">
            Height: {user?.height}cm
          </Text>
          <Text className="text-[#176219] font-semibold text-xl">
            Weight: {user?.weight}kg
          </Text>
          <Text className="text-[#176219] font-semibold text-xl">
            Gender: {user?.gender === 0 ? "Male" : "Female"}
          </Text>
        </View>
      </View>
      <View className="h-1 bg-[#3D6440] w-[100%] my-4 rounded-full"></View>
      <View className="flex gap-y-4">
        <Pressable
          className="flex flex-row items-center"
          onPress={() => setModalVisible(1)}
        >
          <Bolt size={24} color="#176219" />

          <Text className="text-[#176219] text-xl font-semibold ml-4">
            Notification Preferences
          </Text>
        </Pressable>
        <Pressable
          className="flex flex-row items-center"
          onPress={() => setModalVisible(2)}
        >
          <Bell size={24} color="#176219" />

          <Text className="text-[#176219] text-xl font-semibold ml-4">
            Notifications
          </Text>
        </Pressable>
        <Pressable
          className="flex flex-row items-center"
          onPress={() => setModalVisible(3)}
        >
          <Goal size={24} color="#176219" />

          <Text className="text-[#176219] text-xl font-semibold ml-4">
            Goal
          </Text>
        </Pressable>
        <Pressable
          className="flex flex-row items-center"
          onPress={() => setModalVisible(4)}
        >
          <UserRound size={24} color="#176219" />

          <Text className="text-[#176219] text-xl font-semibold ml-4">
            Fitness Profile
          </Text>
        </Pressable>
        <Pressable
          className="flex flex-row items-center"
          onPress={() => setModalVisible(5)}
        >
          <Shield size={24} color="#176219" />

          <Text className="text-[#176219] text-xl font-semibold ml-4">
            Account Information
          </Text>
        </Pressable>
        <Pressable
          className="flex flex-row items-center"
          onPress={() => setModalVisible(6)}
        >
          <Clipboard size={24} color="#176219" />

          <Text className="text-[#176219] text-xl font-semibold ml-4">
            Report
          </Text>
        </Pressable>
        <Pressable
          className="flex flex-row items-center"
          onPress={() => setModalVisible(7)}
        >
          <Notebook size={24} color="#176219" />

          <Text className="text-[#176219] text-xl font-semibold  ml-4">
            Contact Admin
          </Text>
        </Pressable>
      </View>
      <View className="h-1 bg-[#3D6440] w-[100%] my-4 rounded-full"></View>
      <Pressable className="flex flex-row items-center" onPress={handleLogout}>
        <LogOut size={24} color="red" />
        <Text className="text-red-600 text-xl font-semibold ml-4">Log out</Text>
      </Pressable>
    </ScrollView>
  );
};

export default User;
