import React, {useLayoutEffect, useState} from 'react'
import { View, StyleSheet, Text, Image, Switch} from 'react-native';
import { ScrollView, TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Env from '../env';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";


const SettingsScreen = ({navigation}) => {
const [deviceToken, setDeviceToken] = useState('')
const [isDebugModeEnabled, setIsDebugModeEnabled] = useState(true)
const [isPushEnabled, setIsPushEnabled] = useState(true)
const [isTrackDeviceAttributesEnabled, setIsTrackDeviceAttributesEnabled] = useState(true)
const [isTrackScreensEnabled, setIsTrackScreensEnabled] = useState(true)
const [bgQDelay, setBgQDelay] = useState("30")
const [bgQMinNumTasks, setBgQMinNumTasks] = useState("10")

useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    })
  }, [navigation])

  const toggleSwitch = (type) => {
    switch(type) {
      case "Push":
        setIsPushEnabled(previousState => !previousState)
        break
      case "Debug":
        setIsDebugModeEnabled(previousState => !previousState);
        break
      case "DeviceAttr":
        setIsTrackDeviceAttributesEnabled(previousState => !previousState);
        break
      case "Screens":
        setIsTrackScreensEnabled(previousState => !previousState);
        break
    }
  }

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
  
    // // (required) Called when a remote is received or opened, or local notification is opened
    // onNotification: function (notification) {
    //   console.log("NOTIFICATION:", notification);
  
    //   // process the notification
  
    //   // (required) Called when a remote is received or opened, or local notification is opened
    //   notification.finish(PushNotificationIOS.FetchResult.NoData);
    // },
  
    // // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    // onAction: function (notification) {
    //   console.log("ACTION:", notification.action);
    //   console.log("NOTIFICATION:", notification);
  
    //   // process the action
    // },
  
    // // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    // onRegistrationError: function(err) {
    //   console.error(err.message, err);
    // },
  
    // // IOS ONLY (optional): default: all - Permissions to register.
    // permissions: {
    //   alert: true,
    //   badge: true,
    //   sound: true,
    // },
  
    // // Should the initial notification be popped automatically
    // // default: true
    // popInitialNotification: true,
  
    // /**
    //  * (optional) default: true
    //  * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //  * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //  * - if you are not using remote notification or do not have Firebase installed, use this:
    //  *     requestPermissions: Platform.OS === 'ios'
    //  */
    // requestPermissions: true,
  });
  
  return (
    <ScrollView style={styles.container}>
       <View style={styles.innerContainer}>
              <View style={styles.headerView}>
                  <Text style={styles.textHeaderLabel}>Settings</Text>
            </View>
            <View style={[styles.rowView, {marginTop: 10}]}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>Device Token</Text>
                  <TextInput
                    style={styles.input}
                    value={deviceToken}
                    placeholder="device token"
                    editable={false}
                  />
                  <TouchableOpacity
                  style={styles.copyToClipboardButton}
                      onPress={() => settingsTapped()}>
                          <Image 
                          style={styles.copyToClipboardImage}
                          source={require('../assets/images/paper.png')}>

                          </Image>
                  </TouchableOpacity>
                </View>
              </View>
            {/* CIO Track URL */}
              <View style={styles.rowView}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>CIO Track URL</Text>
                  <TextInput
                    style={styles.input}
                    value={deviceToken}
                    placeholder="track.customer.io"
                    editable={false}
                />
                <View style={styles.copyToClipboardButton}></View>
                </View>
              </View>

            {/* Gist Environment */}
              <View style={styles.rowView}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>Gist Environment</Text>
                  <TextInput
                    style={styles.input}
                    value={deviceToken}
                    placeholder="Gist"
                    editable={false}
                />
                <View style={styles.copyToClipboardButton}></View>
                </View>
            </View>


            {/* Section #2 */}
            <View style={[styles.rowView, {marginTop: 30}]}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>Site Id</Text>
                  <TextInput
                    style={styles.input}
                    value={Env.siteId}
                    placeholder="siteId"
                    editable={false}
                  />
                  <View style={styles.copyToClipboardButton}></View>
                </View>
              </View>
              {/* API Key */}
              <View style={styles.rowView}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>API Key</Text>
                  <TextInput
                    style={styles.input}
                    value={Env.apiKey}
                    placeholder="Api key"
                    editable={false}
                  />
                  <View style={styles.copyToClipboardButton}></View>
                </View>
              </View>
              {/* Org Id */}
              <View style={styles.rowView}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>Org Id</Text>
                  <TextInput
                    style={styles.input}
                    value={Env.organizationId}
                    placeholder="Gist Org id"
                    editable={false}
                  />
                  <View style={styles.copyToClipboardButton}></View>
                </View>
              </View>

              {/* Section #3 */}
            <View style={[styles.rowView, {marginTop: 30}]}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>backgroundQueueSecondsDelay</Text>
                  <TextInput
                    style={styles.input}
                    value={bgQDelay}
                    onChangeText={(e) => setBgQDelay(e)}
                  />
                  <View style={styles.copyToClipboardButton}></View>
                </View>
              </View>
              {/* Org Id */}
              <View style={styles.rowView}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>backgroundQueueMinNumberOfTasks</Text>
                  <TextInput
                    style={styles.input}
                    value={bgQMinNumTasks}
                    onChangeText={(e) => setBgQMinNumTasks(e)}
                  />
                  <View style={styles.copyToClipboardButton}></View>
                </View>
              </View>

            {/* Features Header */}
            <View style={[styles.headerView, {paddingTop: 50}]}>
                  <Text style={styles.textHeaderLabel}>Features</Text>
            </View>
            <View style={[styles.rowView, {marginTop: 10}]}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>Enable Push Notifications</Text>
                  <Switch
                    trackColor={{ false: "#32BD54", true: "#32BD54" }}
                    thumbColor={isPushEnabled ? "#ffffff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch('Push')}
                    value={isPushEnabled}
                  />
                </View>
              </View>
            {/* CIO Track URL */}
              <View style={styles.rowView}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>Track Screens</Text>
                  <Switch
                    trackColor={{ false: "#32BD54", true: "#32BD54" }}
                    thumbColor={isTrackScreensEnabled ? "#ffffff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch('Screens')}
                    value={isTrackScreensEnabled}
                  />
                </View>
              </View>

              <View style={styles.rowView}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>Track Device Attributes</Text>
                  <Switch
                    trackColor={{ false: "#32BD54", true: "#32BD54" }}
                    thumbColor={isTrackDeviceAttributesEnabled ? "#ffffff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch('DeviceAttr')}
                    value={isTrackDeviceAttributesEnabled}
                  />
                </View>
                </View>
                <View style={styles.rowView}>
                <View style={styles.stackColumnView}>
                  <Text style={styles.textLabel}>Debug mode</Text>
                  <Switch
                    trackColor={{ false: "#32BD54", true: "#32BD54" }}
                    thumbColor={isDebugModeEnabled ? "#ffffff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => toggleSwitch('Debug')}
                    value={isDebugModeEnabled}
                  />
                
              </View>
              </View>
        </View> 
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "white",
    },
    sectionView: {
      flexDirection: 'row',
      marginTop: 30
    },
    copyToClipboardButton:{
      alignContent: 'flex-end',
      justifyContent: 'flex-end',
      alignSelf:'flex-end',
      height: 30,
      width: 25
    },
    copyToClipboardImage: {
      width: 20,
      height: 20,
  },
    rowView:{
      flexDirection: 'row',
      paddingTop: 10
    },
    stackColumnView: {
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      width: '100%',
    },
    textLabel:{
      fontSize: 14,
      alignContent: 'flex-end',
      justifyContent: 'flex-end',
      alignSelf:'flex-end',
      color: "#404040"
    },
    headerView:{
      justifyContent:'space-around',
    },
    textHeaderLabel: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
      },
    innerContainer:{
      flex:1,
      backgroundColor:'white',
      padding: 20
    },
    input: {
      flex: 1,
      borderWidth: 1,
      padding:  5,
      marginLeft: 10,
      backgroundColor: 'white',
      borderColor: '#fff',
      borderBottomColor: '#e6e6e6',
      borderRadius: 10,
    },
})
export default SettingsScreen;