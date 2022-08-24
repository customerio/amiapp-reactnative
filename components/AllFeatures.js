import React from "react";
import { StyleSheet } from "react-native";
import TrackEvent from "./TrackEvent";
import { DeviceAttributes, ProfileAttributes } from "./Attributes";
import { ScrollView } from "react-native-gesture-handler";
import ClearIdentity from "./ClearIdentity";

const AllFeatures = (props) => {
  return (
    <ScrollView style={styles.container}>
      <TrackEvent></TrackEvent>
      <DeviceAttributes />
      <ProfileAttributes />
      <ClearIdentity onClear={props.onClear} />
    </ScrollView>
  );
};

export default AllFeatures;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  innerContainer: {
    marginTop: 5,
  },
  input: {
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderColor: "#e6e6e6",
    borderRadius: 10,
  },
});
