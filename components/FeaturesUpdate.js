import React, {useEffect} from "react";
import { StyleSheet, Text, FlatList, View, Image, Button, ImageBackground, Linking} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {SubHeaderText} from './common/Text'
import { CustomerIO, CustomerioConfig, CioLogLevel, CustomerIOEnv, InAppMessageEventType, InAppMessageEvent } from "customerio-reactnative";
import Env from "../env";
import {PushconfigOptions} from "customerio-reactnative/types";

const FeaturesUpdate = ({navigation}) => {

  useEffect(() => {

    // MARK:- INITIALIZE PACKAGE WITH CONFIG
    // MARK:- UPDATE CONFIGURATIONS
    // MARK:- INITIALIZE IN-APP

    const data = new CustomerioConfig()
    data.logLevel = CioLogLevel.debug
    data.autoTrackDeviceAttributes = true
    data.enableInApp = true

    const env = new CustomerIOEnv()
    env.siteId = Env.siteId
    env.apiKey = Env.apiKey

    CustomerIO.initialize(env, data) 
  }, [])
  
  useEffect(() => {
    CustomerIO.inAppMessaging().registerEventsListener((event) => {
      console.log(event)
      switch (event.eventType) {
        case InAppMessageEventType.messageShown:
          CustomerIO.track(
            "in-app event",
            { "event_name": "message shown", "delivery_id": event.deliveryId ?? "NULL", "message_id": event.messageId }
          )
          break;
        case InAppMessageEventType.messageDismissed:
          CustomerIO.track(
            "in-app event",
            { "event_name": "message dismissed", "delivery_id": event.deliveryId ?? "NULL", "message_id": event.messageId }
          )
          break;
        case InAppMessageEventType.errorWithMessage:
          CustomerIO.track(
            "in-app event",
            { "event_name": "message error", "delivery_id": event.deliveryId ?? "NULL", "message_id": event.messageId }
          )
          break;
        case InAppMessageEventType.messageActionTaken:
          CustomerIO.track(
            "in-app event",
            { "event_name": "message action", "delivery_id": event.deliveryId ?? "NULL", "message_id": event.messageId, "action": event.actionValue, "name": event.actionName }
          )
          if (event.actionValue === "dismiss" || event.actionValue === "close") {
            CustomerIO.inAppMessaging().dismissMessage();
          }
          break;
        default:
          CustomerIO.track(
            "in-app event",
            { "event_name": "unsupported event", "event": event }
          )
      }
    });
  }, [])

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
    }

    const renderFeaturesAvailableCell = (item) => {
        return (
          <View style={styles.featuresCell}>
            <Image style = {styles.checkmark} source={require('../assets/images/checkmark.png')}></Image>
            <Text style={styles.item}>{item.key}</Text>
          </View>
        )
      } 

    const handlePushPermissionStatus = (status) => {
      switch(status) {
        case "Granted":
          console.log("Push permission status is - Granted")
          break;
        case "Denied":
          console.log("Push permission status is - Denied")
          break;
        case "NotDetermined":
          console.log("Push permission status is - NotDetermined")
          break;
      }
      alert("Permission Status -> " + status)
    }

    const getPushPermissionStatus = () => {
      CustomerIO.getPushPermissionStatus().then(status => {
        handlePushPermissionStatus(status)
      })
    }

    const requestPushPermissionPrompt = () => {
      var options = {"ios" : {"sound" : true, "badge" : true}}
      CustomerIO.showPromptForPushNotifications(options).then(status => {
        handlePushPermissionStatus(status)
      }).catch(error => {
        alert("Failed to show push permission prompt.")
        console.log(error)
      })
    }

      // Navigate
      const goToFeaturesTrial = () => {
          CustomerIO.clearIdentify()
          navigation.navigate("FeaturesTrial")
      }

    return(
        <ImageBackground style={styles.container} source = {require('../assets/images/cio_dots_bg.png')}>
        <StatusBar style="auto" />
        <Image source={require('../assets/images/ami_jones.png')} style={styles.userami}/>
        <Text style = {styles.headerText}>Welcome Ami !!</Text>
        <SubHeaderText label="This app can help you test"/>
        

        <FlatList style={styles.featuresList}
        data={[
          {key: 'Initialize package'},
          {key: 'Identify user'},
          {key: 'Clear user identity'},
          {key: 'Register device token'},
          {key: 'Track event'},
          {key: 'Device Attributes'},
          {key: 'Profile Attributes'},
          {key: 'Push Notifications'}
        ]}
        renderItem={({item}) => renderFeaturesAvailableCell(item)}
        ItemSeparatorComponent = {renderSeparator}
      />
      <Button title="Let's get started" style={styles.getStartedButton} onPress={() => goToFeaturesTrial()}></Button>
      <Button title="Get push permission status" style={styles.getStartedButton} onPress={() => getPushPermissionStatus()}></Button>
      <Button title="Show Push Prompt" style={styles.getStartedButton} onPress={() => requestPushPermissionPrompt()}></Button>

      </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    featuresList: {
      width: '80%',
      height: '30%',
      flexGrow : 0,
    },
    featuresCell: {
      flex: 1,
      flexDirection: 'row'
    },
    getStartedButton : {
  
    },
    userami :{
      height: 100,
      width : 100,
      marginTop: 100
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      paddingLeft : 20
    },
    headerText: {
      fontWeight: 'bold',
      fontSize : 40,
      padding: 10
    },
    subHeaderText : {
      padding : 20,
      marginTop: 40,
      fontSize: 15,
      fontWeight : 'bold'
    },
    checkmark :{
      width:20,
      height: 20,
      marginTop: 12,
      
    }
  });

  export default FeaturesUpdate;