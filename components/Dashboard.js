import React, {useState} from 'react'
import { View, Text, FlatList, StyleSheet, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CioManager from '../manager/CioManager'
import ThemedButton from './common/Button'
import PushNotification from "react-native-push-notification";

const Dashboard = ({navigation}) => {

    
    const sendRandomEventTapped = () => {
        const cioManager = new CioManager()
        cioManager.randomEvent()
    }

    const settingsTapped = () => {
        navigation.navigate("SettingsScreen")
    }
    const sendCustomEventTapped = () => {
        navigation.navigate("CustomDataScreen", {
            featureType : "Custom Event"
        })
    }

    const setDeviceAttributesTapped = () => {
        navigation.navigate("CustomDataScreen", {
            featureType : "Device Attributes"
        })
    }

    const setProfileAttributesTapped = () => {
        navigation.navigate("CustomDataScreen", {
            featureType : "Profile Attributes"
        })
    }

    const viewLogsTapped = () => {
        navigation.navigate("ViewLogsScreen")
    }

    const logoutTapped = () => {
        const cioManager = new CioManager()
        cioManager.clearUserIdentity()
        navigation.popToTop()
    }

    const renderDashboardButtons = (item) => {
        return (
            <ThemedButton onPress={ item.onClick} title={item.key}/>
        )
    }

    PushNotification.configure({
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    })
      
    return (
        <View style={styles.container}>
            <View style={{flex:1,backgroundColor:'white', paddingTop: 50}}>
                <View style={{justifyContent:'space-around'}}>
                    <View style={{height:50,alignSelf:'stretch',margin:5}}>
                        <View style={styles.settingsView}>
                            <TouchableOpacity
                                onPress={() => settingsTapped()}>
                                    <Image 
                                    style={styles.settingsImage}
                                    source={require('../assets/images/black-settings-button.png')}>

                                    </Image>
                            </TouchableOpacity>
                            </View>
                        </View>  
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>
                        What would you like to test?
                    </Text>

                    <View style={styles.featuresView}>
                    <FlatList
                        data={[
                        {key: 'Send Random Event', onClick: () => sendRandomEventTapped()},
                        {key: 'Send Custom Event', onClick: () => sendCustomEventTapped()},
                        {key: 'Set Device Attributes', onClick: () => setDeviceAttributesTapped()},
                        {key: 'Set Profile Attributes', onClick: () => setProfileAttributesTapped()},
                        {key: 'View Logs', onClick: () => viewLogsTapped()},
                        {key: 'Logout', onClick: () => logoutTapped()},
                        ]}
                        renderItem={({item}) => renderDashboardButtons(item)}
                    />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    innerContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'stretch',
        margin:5
    },
    title: {
        fontSize: 22
    },
    featuresView: {
        width: '80%'
    },
    featureTitleText:{
        color:'#fff',
        textAlign:'center',
        fontWeight: '600',
        paddingLeft : 10,
        fontSize: 17,
        paddingRight : 10
    },
    settingsView: {    
        alignItems: 'flex-end',
        height: 50,
        flex: 1,
        paddingRight: 30,
    },
    settingsImage: {
        width: 50,
        height: 50
    },
    flexRow: {
        top: 75,
        flexDirection: 'row',
    }
})

export default Dashboard;