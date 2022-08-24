import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";
import AllFeatures from "./AllFeatures";
import { SubHeaderText, SimpleText } from "./common/Text";
import IdentifyUser from "./IdentifyUser";

const FeaturesTrial = () => {
  const [isUserIdentified, setisUserIdentified] = useState(false);
  const [amiUserName, setAmiUserName] = useState("Ami");

  useEffect(() => {}, []);

  const UserIdentified = (amiName) => {
    setAmiUserName(amiName);
    setisUserIdentified(true);
  };

  const OnClear = () => {
    setisUserIdentified(false);
  };

  const info = isUserIdentified
    ? "Awesome ! Your playground is ready now."
    : "First, you need to identify a user to start using the other features of the app.";
  const packageInfo = `Hey ${amiUserName} ! Package is already initialised on the app launch.`;
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/images/cio_dots_bg.png")}
    >
      <View style={styles.headerArea}>
        <Image
          style={styles.waveAmiImage}
          source={require("../assets/images/cio_hand.png")}
        ></Image>
        <SubHeaderText label={packageInfo} />
        <SimpleText label={info}></SimpleText>
      </View>

      {isUserIdentified ? (
        <AllFeatures onClear={() => OnClear()} />
      ) : (
        <IdentifyUser onPress={(amiName) => UserIdentified(amiName)} />
      )}
    </ImageBackground>
  );
};
export default FeaturesTrial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  headerArea: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20,
  },
  waveAmiImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});
