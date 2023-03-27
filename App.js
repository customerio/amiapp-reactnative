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
    setConfigurationsInAsyncStorage()
    console.log("welome to ami app")
    initialiseCioPackage()
  }, [])
  
  const setConfigurationsInAsyncStorage = async () => {
    const keyStorageObj = new CioKeyValueStorage()
    
    const value = await keyStorageObj.getScreenTrack()
    alert("Meri value =" , value)
    if (value === null) {
      // Set to default value if this is a first time launch
      await keyStorageObj.saveScreenTrack(true)
    }
  }

  const initialiseCioPackage = () => {

    const configuration = new CustomerioConfig()
    configuration.logLevel = CioLogLevel.debug
    configuration.autoTrackDeviceAttributes = true

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
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.getCurrentRoute().name;
  
          if (previousRouteName !== currentRouteName) {
            CustomerIO.screen(currentRouteName)
          }
          routeNameRef.current = currentRouteName;
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

