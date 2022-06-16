import React, {useEffect, useRef} from 'react';
import { StyleSheet} from 'react-native';
import FeaturesUpdate from './components/FeaturesUpdate';
import FeaturesTrial from './components/FeaturesTrial';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerIO } from 'customerio-reactnative';
const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    console.log("Welcome to Ami App ! ")
  }, [])
  
  // Automatic screen tracking
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  return (
    
       // MARK:- AUTO SCREEN TRACKING
      // Start
      <NavigationContainer
        ref={navigationRef}
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
          headerShown : false
        }}/>
        <Stack.Screen name="FeaturesTrial" component={FeaturesTrial}
        options={{
          title : "Let's Play",
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
    paddingTop : 50,
    justifyContent:'center'
  },
});

