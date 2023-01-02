import React, {useState} from 'react'
import { View, Text, FlatList, StyleSheet, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ThemedButton from './common/Button'

const Dashboard = ({navigation}) => {

    const sendRandomEventTapped = () => {
        alert("Add random event here")
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
        navigation.navigate("ViewLogs")
    }

    const logoutTapped = () => {
        navigation.popToTop()
    }

    const renderDashboardButtons = (item) => {
        return (
            <ThemedButton onPress={ item.onClick} title={item.key}/>
        )
    }

    
      
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
                    <FlatList style={styles.featuresList}
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