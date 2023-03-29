import React, {useEffect, useRef, useState} from 'react';
import { ActivityIndicator,StyleSheet} from 'react-native';
import Login from './components/Login';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerIO, CustomerioConfig, CioLogLevel, CustomerIOEnv } from "customerio-reactnative";
import Dashboard from './components/Dashboard';
import CustomDataScreen from './components/CustomDataScreen';
import SettingsScreen from './components/SettingsScreen'
import ViewLogs from './components/ViewLogs';
import Env from "./env";
import CioManager from './manager/CioManager';
import CioKeyValueStorage from './manager/KeyValueStorage';

const Stack = createNativeStackNavigator();

export default function App() {

  const [firstScreen, setFirstScreen] = useState(undefined)
  const [loading, setLoading] = useState(true);
const [isScreenTrackEnabled, setIsScreenTrackEnabled] = useState(null)
const [isDeviceAttrTrackEnabled, setIsDeviceAttrTrackEnabled] = useState(null)
const [isDebugModeEnabled, setIsDebugModeEnabled] = useState(null)
const [bgDelayValue, setBgDelayValue] = useState(null)
const [bgTasksValue, setBgTasksValue] = useState(null)
  useEffect(() => {
    (async () => {
      const keyStorageObj = new CioKeyValueStorage()
      const status = await keyStorageObj.getLoginStatus()
      setLoading(false)
      if (JSON.parse(status) == true) {
        setFirstScreen("Dashboard")
        return
      }
      setFirstScreen("Login")
      
    })();
  }, [])

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

  useEffect(() => {
    fetchConfigsOrSetDefault()
  }, [])

  useEffect(() => {
    if(isDeviceAttrTrackEnabled !== null && isScreenTrackEnabled !== null && isDebugModeEnabled != null && bgDelayValue !== null && bgTasksValue !== null)
    initialiseCioPackage()
  }, [isDeviceAttrTrackEnabled, isScreenTrackEnabled, isDebugModeEnabled, bgDelayValue, bgTasksValue])
  
  // const fetchScreenTrackConfig = async () => {
  //   const keyStorageObj = new CioKeyValueStorage()
  //   const value = await keyStorageObj.getScreenTrack()
  //   if (value === null) {
  //     // Set to default value if this is a first time launch
  //     await keyStorageObj.saveScreenTrack(true)
  //   }
  //   setIsScreenTrackEnabled(value === null ? true : JSON.parse(value))
  // }

  // const fetchDeviceAttrTrackConfig = async () => {
  //   const keyStorageObj = new CioKeyValueStorage()
  //   const value = await keyStorageObj.getDeviceAttributesTrack()
  //   if (value === null) {
  //     // Set to default value if this is a first time launch
  //     await keyStorageObj.saveDeviceAttributesTrack(true)
  //   }
  //   setIsDeviceAttrTrackEnabled(value === null ? true : JSON.parse(value))
  // }

  // const fetchDebugModeConfig = async () => {
  //   const keyStorageObj = new CioKeyValueStorage()
  //   const value = await keyStorageObj.getDebugModeConfig()
  //   if (value === null) {
  //     // Set to default value if this is a first time launch
  //     await keyStorageObj.saveDebugModeConfig(true)
  //   }
  //   setIsDebugModeEnabled(value === null ? true : JSON.parse(value))
  // }

  const fetchConfigsOrSetDefault = async() => {
    const keyStorageObj = new CioKeyValueStorage()
    const bgDelayValue  = await keyStorageObj.getBGQSecondsDelay()
    const bgTasksValue = await keyStorageObj.getBGQMinTasksInQueue()
    const screenTrackValue = await keyStorageObj.getScreenTrack()
    const deviceAttrValue = await keyStorageObj.getDeviceAttributesTrack()
    const debugModeValue = await keyStorageObj.getDebugModeConfig()
    
    if (screenTrackValue === null) {
      await keyStorageObj.saveScreenTrack(true)
    }
    if (bgDelayValue === null) {
      await keyStorageObj.saveBGQSecondsDelay('30')
    }
    if (bgTasksValue === null) {
      await keyStorageObj.saveBGQMinTasksInQueue('10')
    }
    if (deviceAttrValue === null) {
      await keyStorageObj.saveDeviceAttributesTrack(true)
    }
    if (debugModeValue === null) {
      await keyStorageObj.saveDebugModeConfig(true)
    }
    setIsDeviceAttrTrackEnabled(deviceAttrValue === null ? true : JSON.parse(deviceAttrValue))
    setIsScreenTrackEnabled(screenTrackValue === null ? true : JSON.parse(screenTrackValue))
    setIsDebugModeEnabled(debugModeValue === null ? true : JSON.parse(debugModeValue))
    setBgDelayValue(bgDelayValue === null ? 30 : parseInt(bgDelayValue))
    setBgTasksValue(bgTasksValue === null ? 10 : parseInt(bgTasksValue))
  }

  const initialiseCioPackage = () => {

    const configuration = new CustomerioConfig()
    configuration.logLevel = isDebugModeEnabled === null ? CioLogLevel.debug : isDebugModeEnabled
    configuration.autoTrackDeviceAttributes = isDeviceAttrTrackEnabled === null ? true : isDeviceAttrTrackEnabled 
    configuration.backgroundQueueMinNumberOfTasks = bgTasksValue
    configuration.backgroundQueueSecondsDelay = bgDelayValue
    const env = new CustomerIOEnv()
    env.siteId = Env.siteId
    env.apiKey = Env.apiKey

    const cioManager = new CioManager()
    cioManager.initializeCio(env, configuration)
  }

  if (loading == true ) {
    return (
      <ActivityIndicator/>
    ) 
  } else {
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
          if (isScreenTrackEnabled) {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.getCurrentRoute().name;
    
            if (previousRouteName !== currentRouteName) {
              CustomerIO.screen(currentRouteName)
            }
            routeNameRef.current = currentRouteName;
          }
        }}
        // End
        >
        
      <Stack.Navigator initialRouteName={firstScreen}>
        <Stack.Screen name="Login"
        component={Login}
        options={{
          headerShown : false,
          gestureEnabled: false,
          gestureDirection: 'vertical',
        }}/>
        <Stack.Screen name="Dashboard" component={Dashboard}
        options={{
          headerShown : false,
          gestureEnabled: false,
          
        }}
       />
       <Stack.Screen name="CustomDataScreen" component={CustomDataScreen}
       options={{
          title:"",
          headerStyle: {
            backgroundColor: '#ffffff'},
        }}
       />
       <Stack.Screen name="ViewLogsScreen" component={ViewLogs}
       options={{
          title:"",
        }}
       />
       <Stack.Screen name="SettingsScreen" component={SettingsScreen}
       options={{
          title:"",
          headerStyle: {
            // backgroundColor: '#ffffff'
          },
        }}
       />
       </Stack.Navigator>
    
    </NavigationContainer>
    );
    }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop : 50,
    justifyContent:'center'
  },
});

