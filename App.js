import React, {useEffect, useRef} from 'react';
import { StyleSheet} from 'react-native';
import FeaturesUpdate from './components/FeaturesUpdate';
import FeaturesTrial from './components/FeaturesTrial';
import Login from './components/Login';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerIO } from 'customerio-reactnative';
import Dashboard from './components/Dashboard';
import CustomDataScreen from './components/CustomDataScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    console.log("Welcome to Ami App ! ")
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

      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login"
        component={Login}
        options={{
          headerShown : false
        }}/>
        <Stack.Screen name="Dashboard" component={Dashboard}
        options={{
          headerShown : false
        }}
       />
       <Stack.Screen name="CustomDataScreen" component={CustomDataScreen}
       options={{
          // headerShown : false
          title:"",
          headerStyle: {
            backgroundColor: '#ffffff'          },
        }}
       />
       </Stack.Navigator>
    </NavigationContainer>
    );
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop : 50,
    justifyContent:'center'
  },
});

