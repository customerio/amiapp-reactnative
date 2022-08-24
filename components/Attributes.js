import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import FeatureButton from './common/FeatureButton';
import { SubHeaderText } from './common/Text';
import { CustomerIO } from "customerio-reactnative";

const DeviceAttributes = () => {
    const [customDeviceAttribute, setCustomDeviceAttribute] = useState('')
    const [additionalAttributes, setAdditionalAttributes] = useState('')

    // MARK:- SET DEVICE ATTRIBUTES
    // Start
      const setDeviceAttributes = () => {
        const deviceAttributes = {
            type : "Device attributes",
            detail : {
                location : "SomeLocation",
                model : "iPhone 13",
                os : "iOS 14",
            },
            userAttributes: customDeviceAttribute,
            additionalAttributes : additionalAttributes
          };
        CustomerIO.setDeviceAttributes(deviceAttributes)
    // End
        alert("Device attributes updated successfully.")
      }
      
  return (
    <View style={styles.container}>
        <SubHeaderText label = "DEVICE ATTRIBUTES"/>
        <TextInput
            style={styles.input}
            onChangeText={(e) => setCustomDeviceAttribute(e)}
            value={customDeviceAttribute}
            placeholder="Want to send some custom attributes? Type here."
        />
        <TextInput
            style={styles.input}
            onChangeText={(e) => setAdditionalAttributes(e)}
            value={additionalAttributes}
            placeholder="Want to add some more ?"
        />
        <FeatureButton
            title ="Send device attributes"
            style={{marginBottom: 20}}
            onPress={() => setDeviceAttributes()}></FeatureButton>
    </View>
  )
}

const ProfileAttributes = () => {
    const [customProfileAttribute, setCustomProfileAttribute] = useState('')
    const [additionalAttributes, setAdditionalAttributes] = useState('')

    const setProfileAttributes = () => {
      // MARK:- SET PROFILE ATTRIBUTES, updating to test husku
      // Start
        const profileAttributes = {
            type : "Profile attributes",
            favouriteFood : "Pizza",
            favouriteDrink : "Mango Shake",
            customProfileAttributes: customProfileAttribute,
            additionalAttributes : additionalAttributes
          };
        CustomerIO.setProfileAttributes(profileAttributes)
        // End
        
        alert("Profile attributes updated successfully.")
      }

      

  return (
    <View style={styles.container}>
        <SubHeaderText label = "PROFILE ATTRIBUTES"/>
        <TextInput
            style={styles.input}
            onChangeText={(e) => setCustomProfileAttribute(e)}
            value={customProfileAttribute}
            placeholder="Try sending profile attributes"
        />
        <TextInput
            style={styles.input}
            onChangeText={(e) => setAdditionalAttributes(e)}
            value={additionalAttributes}
            placeholder="Need to send some more data ?"
        />
        <FeatureButton
            title ="Send profile attributes"
            style={{marginBottom: 20}}
            onPress={() => setProfileAttributes()}></FeatureButton>
    </View>
  )
}

export {DeviceAttributes, ProfileAttributes};

const styles = StyleSheet.create({
    container : {
        flex: 2,
        flexDirection : 'column',
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 25
    },
    row: {
        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-evenly',
    },
    input: {
        height: 40,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderColor: '#e6e6e6',
        borderRadius: 10
      },
})