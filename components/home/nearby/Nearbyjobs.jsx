import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./nearbyjobs.style";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hooks/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });
  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  const listDisplay = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" colors={COLORS.primary} />;
    } else if (error) {
      return <Text>Something went wrong</Text>;
    } else {
      return data?.map((job) => (
        <NearbyJobCard
          job={job}
          key={`nearby-job-${job?.job_id}`}
          handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
        />
      ));
      // <FlatList
      //   horizontal
      //   data={data}
      //   renderItem={({ item }) => (
      //     <PopularJobCard
      //       item={item}
      //       selectedJob={selectedJob}
      //       handleCardPress={handleCardPress}
      //     />
      //   )}
      //   keyExtractor={(item) => item?.job_id}
      //   contentContainerStyle={{ columnGap: SIZES.medium }}
      // />
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>{listDisplay()}</View>
    </View>
  );
};

export default Nearbyjobs;
