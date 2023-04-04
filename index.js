import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import { CustomerIO } from "customerio-reactnative";

messaging().setBackgroundMessageHandler(async remoteMessage => {
    CustomerIO.pushMessaging().onBackgroundMessageReceived(remoteMessage).then(handled => {
        console.log(`Notification handled in the background: ${handled}`);
    });
});

AppRegistry.registerComponent(appName, () => App);
