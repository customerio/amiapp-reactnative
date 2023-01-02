import React, {useState} from 'react'
import { View, Text, FlatList, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ThemedButton from './common/Button'

const Dashboard = ({navigation}) => {


    const buttons = [
        "Send Random Event",
        "Send Custom Event",
        "Set Device Attributes",
        "Set Profile Attributes",
        "View Logs",
        "Logout"
        ]
    const sendRandomEventTapped = () => {
        alert("Add random event here")
    }

    const sendCustomEventTapped = () => {
        navigation.navigate("CustomDataScreen", {
            featureType : "Custom Event"
        })
    }

    const dashboardButtons = () => {
        buttons.map(p => (
         <ThemedButton onClick={e=>{ this.sendCustomEventTapped()}} title={p}/>
      ));
    }

    const renderDashboardButtons = (item) => {
        return (
            <ThemedButton onClick={e=>{ this.sendCustomEventTapped()}} title={item.key}/>
        )
      }
      
    return (
        <View style={styles.container}>
            <View style={styles.settingsView}>
                <TouchableOpacity
                    // style={styles.featureButton}
                    onPress={() => loginTapped()}>

                    <Text style={styles.featureTitleText, {color: '#000', fontWeight: '600', paddingRight: 30}}>Settings</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.innerContainer}>
                <Text style={styles.title}>
                    What would you like to test?
                </Text>

                <View style={styles.featuresView}>
                <FlatList style={styles.featuresList}
                    data={[
                    {key: 'Send Random Event'},
                    {key: 'Send Custom Event'},
                    {key: 'Set Device Attributes'},
                    {key: 'Set Profile Attributes'},
                    {key: 'View Logs'},
                    {key: 'Logout'},
                    ]}
                    renderItem={({item}) => renderDashboardButtons(item)}
                />
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
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
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
        top: 75,
        alignItems: 'flex-end',
    }
})

export default Dashboard;