import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  Button,
  ImageBackground,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SubHeaderText } from "./common/Text";
import {
  CustomerIO,
  CustomerioConfig,
  CioLogLevel,
  CustomerIOEnv,
} from "customerio-reactnative";
import Env from "../env";

const FeaturesUpdate = ({ navigation }) => {
  useEffect(() => {
    // MARK:- INITIALIZE PACKAGE WITH CONFIG
    // MARK:- UPDATE CONFIGURATIONS
    // MARK:- INITIALIZE IN-APP

    const data = new CustomerioConfig();
    data.logLevel = CioLogLevel.debug;
    data.autoTrackDeviceAttributes = true;

    const env = new CustomerIOEnv();
    env.siteId = Env.siteId;
    env.apiKey = Env.apiKey;
    env.organizationId = Env.organizationId;

    CustomerIO.initialize(env, data);
  }, []);

  // Renderers
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  const renderFeaturesAvailableCell = (item) => {
    return (
      <View style={styles.featuresCell}>
        <Image
          style={styles.checkmark}
          source={require("../assets/images/checkmark.png")}
        ></Image>
        <Text style={styles.item}>{item.key}</Text>
      </View>
    );
  };

  // Navigate
  const goToFeaturesTrial = () => {
    CustomerIO.clearIdentify();
    navigation.navigate("FeaturesTrial");
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/cio_dots_bg.png")}
    >
      <StatusBar style="auto" />
      <Image
        source={require("../assets/images/ami_jones.png")}
        style={styles.userami}
      />
      <Text style={styles.headerText}>Welcome Ami !!</Text>
      <SubHeaderText label="This app can help you test" />

      <FlatList
        style={styles.featuresList}
        data={[
          { key: "Initialize package" },
          { key: "Identify user" },
          { key: "Clear user identity" },
          { key: "Track event" },
          { key: "Device Attributes" },
          { key: "Profile Attributes" },
          { key: "Push Notifications" },
        ]}
        renderItem={({ item }) => renderFeaturesAvailableCell(item)}
        ItemSeparatorComponent={renderSeparator}
      />
      <Button
        title="Let's get started"
        style={styles.getStartedButton}
        onPress={() => goToFeaturesTrial()}
      ></Button>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  featuresList: {
    width: "80%",
    height: "40%",
    flexGrow: 0,
  },
  featuresCell: {
    flex: 1,
    flexDirection: "row",
  },
  getStartedButton: {},
  userami: {
    height: 100,
    width: 100,
    marginTop: 100,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    paddingLeft: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 40,
    padding: 10,
  },
  subHeaderText: {
    padding: 20,
    marginTop: 40,
    fontSize: 15,
    fontWeight: "bold",
  },
  checkmark: {
    width: 20,
    height: 20,
    marginTop: 12,
  },
});

export default FeaturesUpdate;
