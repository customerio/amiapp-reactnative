import React, {useEffect} from "react";
import { StyleSheet, Text, FlatList, View, Image, Button, ImageBackground} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TouchableHighlight } from "react-native-gesture-handler";

const FeatureButton = (props) => {
  return(
    <View style={styles.container}>
      <TouchableHighlight
      style={[styles.button, props.style]}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={props.onPress}>
          <Text style={styles.text}>{props.title}</Text>
    </TouchableHighlight>
    </View>
  )
  }
export default FeatureButton;

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    button: {
      alignItems: "center",
      backgroundColor: "#5720CC",
      paddingLeft: 40,
      paddingRight: 40,
      padding: 10,
      borderRadius: 8
    },
    text : {
      color : "#ffffff",
    }
})