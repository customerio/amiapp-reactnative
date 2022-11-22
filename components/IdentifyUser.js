import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FeatureButton from "./common/FeatureButton";
import { SubHeaderText, SimpleText } from "./common/Text";
import { CustomerIO } from "customerio-reactnative";
import { checkNotifications, requestNotifications, RESULTS } from "react-native-permissions";

const IdentifyUser = (props) => {

    const handlePermissionRequest = (permission, onGranted, onFailed) => {
        permission
            .then((result) => {
                switch (result.status) {
                    case RESULTS.GRANTED:
                        onGranted();
                        break;
                    default:
                        onFailed(result);
                }
            })
            .catch((error) => {
                console.log("Unable to request permission, error: ", error);
            });
    }

    const requestNotificationsPermission = () => {
        const notificationPermissionOptions = ['alert', 'sound'];
        handlePermissionRequest(
            checkNotifications(notificationPermissionOptions),
            () => {
                console.log("Notifications are enabled on this device for AmiApp");
            },
            (result) => {
                console.log("Requesting for notifications permission. Current status: ", result);
                handlePermissionRequest(
                    requestNotifications(notificationPermissionOptions),
                    () => {
                        console.log("Notifications are now enabled on this device for AmiApp");
                    },
                    (result) => {
                        console.log("Cannot send notifications, permission requested but not granted: ", result);
                    }
                );
            }
        );
    };

    useEffect(() => {
        requestNotificationsPermission()
    }, [])

    const [emailId, setEmailId] = useState("")
    const [userName, setUserName] = useState("")
    
    const IdentifyUser = () => {
        if (emailId == "" || userName == "") {
            alert("Please enter user name and email id")
            return
        }
        
        // MARK:- IDENTIFY USER
        CustomerIO.identify(emailId, {"first_name": userName})
        
        props.onPress(userName)
    }

    return (
        <View style={styles.container}>
            <SubHeaderText label = "IDENTIFY USER"/>
            <View style={styles.innerContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setEmailId(e)}
                    value={emailId}
                    placeholder="User's Email Id"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setUserName(e)}
                    value={userName}
                    placeholder="User's Name"
                />
                <FeatureButton
                title ="Identify User"
                onPress = {() => IdentifyUser()}
                ></FeatureButton>
                <View style={styles.helpText}>
                    <SimpleText label="Testing tip -  To test Push Notification, create a user with word 'ami' in the firstname, example Ami Aman, John D ami etc."></SimpleText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 2,
        width: '100%',
        backgroundColor : "#ffffff",
    },
    innerContainer: {
        marginTop: 5,
    },
    helpText:{
        margin: 20,
        marginTop: 40,
        borderColor : '#808080',
        borderRadius: 10,
        borderWidth: 0.5,
        padding: 10,
        backgroundColor: '#F5F5F5'
    },
    input: {
        height: 40,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#FAFAFA',
        borderColor: '#e6e6e6',
        borderRadius: 10
      },
})

export default IdentifyUser;