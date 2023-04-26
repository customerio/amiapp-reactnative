import React, { useEffect, useRef } from 'react';
import { Linking, StyleSheet } from 'react-native';
import FeaturesUpdate from './components/FeaturesUpdate';
import FeaturesTrial from './components/FeaturesTrial';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Env from './env';
import { CustomerIO, CustomerioConfig, CioLogLevel, CustomerIOEnv, InAppMessageEventType } from "customerio-reactnative";
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    console.log("Welcome to Ami App ! ")
  }, [])

  useEffect(() => {
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
          break;
        default:
          CustomerIO.track(
            "in-app event",
            { "event_name": "unsupported event", "event": event }
          )
      }
    });
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      CustomerIO.pushMessaging().onMessageReceived(remoteMessage).then(handled => {
        console.log(`Notification handled: ${handled}`);
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ' + remoteMessage);
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('getInitialNotification: ' + remoteMessage);
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().getToken().then(token => {
      console.log(`FCM getToken: ${token}`);
    });

    messaging().onTokenRefresh(token => {
      console.log(`FCM onTokenRefresh: ${token}`);
    });

    Linking.getInitialURL().then(url => {
      console.log(`Linking URL: ${url}`);
    });

    console.log(`FCM isAutoInitEnabled: ${messaging().isAutoInitEnabled}`);
    console.log(`FCM isDeviceRegistered: ${messaging().isDeviceRegisteredForRemoteMessages}`);
  }, []);

  // Automatic screen tracking
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  const config = {
    screens: {
      FeaturesTrial: 'showtrial',
    },
  };
  const linking = {
    prefixes: ['amiapp://'],
    config
  };
  return (

    // MARK:- AUTO SCREEN TRACKING
    // Start
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          CustomerIO.screen(currentRouteName)
        }
        routeNameRef.current = currentRouteName;
      }}
    // End
    >

      <Stack.Navigator initialRouteName="FeaturesUpdate">
        <Stack.Screen name="FeaturesUpdate"
          component={FeaturesUpdate}
          options={{
            headerShown: false
          }} />
        <Stack.Screen name="FeaturesTrial" component={FeaturesTrial}
          options={{
            title: "Let's Play",
            headerStyle: {
              backgroundColor: '#F6F7F9',
            },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 50,
    justifyContent: 'center'
  },
});

