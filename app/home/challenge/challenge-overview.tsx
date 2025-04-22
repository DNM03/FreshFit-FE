import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { FormInput } from "~/components/ui/form-input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { getChallengeById } from "~/services/challenge";
import LoadingOverlay from "~/components/ui/loading-overlay";

const ChallengeDetail = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const [ChallengeDetail, setChallengeDetail] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(false);
  useEffect(() => {
    const fetchChallengeDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getChallengeById(
          Array.isArray(params?.id) ? params.id[0] : params?.id
        );
        console.log("Response:", response);
        setChallengeDetail(response.challenge);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChallengeDetail();
  }, [params?.id]);
  const handleJoin = async () => {
    setTimeout(() => {
      console.log("User has joined the challenge");
    }, 2000);
    router.push("/home/challenge/challenges");
  };
  return (
    <View className="flex-1">
      <View className="bg-[#FDFDFD] h-screen w-full">
        <View className="flex flex-row justify-center items-center w-full pt-2 relative  px-2">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-0 top-1/3"
          >
            <ChevronLeft size={32} color="#176219" className="" />
          </Pressable>
          <View className="  ">
            <Text className="text-[#176219] font-semibold text-2xl">
              Challenge Overview
            </Text>
          </View>
        </View>
        <ScrollView className="flex-1 px-4 mt-4">
          <FormInput
            placeholder="Eg, Beefsteak"
            label="Name"
            value={ChallengeDetail?.name || ""}
            readOnly
          />
          <FormInput
            placeholder="Eg, 200"
            label="Weight Loss Target"
            value={ChallengeDetail?.weight_loss_target?.toString() || ""}
            readOnly
          />
          <FormInput
            placeholder="Eg, 60"
            label="Fat Percent"
            value={ChallengeDetail?.fat_percent?.toString() || ""}
            readOnly
          />
          <FormInput
            placeholder="Eg, Beefsteak"
            label="Target"
            value={ChallengeDetail?.target?.toString() || ""}
            readOnly
          />
          <FormInput
            placeholder="Eg, Beefsteak"
            label="Start Date"
            value={
              new Date(
                ChallengeDetail?.start_date || ""
              ).toLocaleDateString() || ""
            }
            readOnly
          />
          <FormInput
            placeholder="Eg, Beefsteak"
            label="End Date"
            value={
              new Date(ChallengeDetail?.end_date || "").toLocaleDateString() ||
              ""
            }
            readOnly
          />
          <View style={{ marginBottom: 16 }}>
            <Label className="text-[#176219] font-medium">Description</Label>
            <Textarea
              placeholder="Eg, 1 cup of rice"
              value={ChallengeDetail?.description || ""}
              readOnly
            />
          </View>
          <Button
            className="bg-[#E0FBE2] mt-8 mb-20"
            onPress={() => router.push("/home/challenge/challenge-detail")}
          >
            <Text className="text-[#176219]">Challenge Detail</Text>
          </Button>
          {params?.source !== "user" && (
            <Button className="bg-[#176219] mx-20 mb-20" onPress={handleJoin}>
              <Text className="text-[#E0FBE2]">Join</Text>
            </Button>
          )}
        </ScrollView>
      </View>
      <LoadingOverlay visible={isLoading} />
    </View>
  );
};

export default ChallengeDetail;
