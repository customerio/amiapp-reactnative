import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Dashboard = ({navigation}) => {


    const sendRandomEventTapped = () => {
        alert("Add random event here")
    }

    const sencCustomEventTapped = () => {
        navigation.navigate("CustomDataScreen", {
            featureType : "Custom Event"
        })
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

                    <TouchableOpacity
                        style={styles.featureButton}
                        onPress={() => sendRandomEventTapped()}
                        underlayColor='#f194ff'>
                        <Text style={styles.featureTitleText}>Send Random Event</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.featureButton}
                        onPress={() => sencCustomEventTapped()}
                        underlayColor='#f194ff'>
                        <Text style={styles.featureTitleText}>Send Custom Event</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.featureButton}
                        onPress={() => loginTapped()}
                        underlayColor='#f194ff'>
                        <Text style={styles.featureTitleText}>Set Device Attributes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.featureButton}
                        onPress={() => loginTapped()}
                        underlayColor='#f194ff'>
                        <Text style={styles.featureTitleText}>Set Profile Attributes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.featureButton}
                        onPress={() => loginTapped()}
                        underlayColor='#f194ff'>
                        <Text style={styles.featureTitleText}>View Logs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.featureButton}
                        onPress={() => loginTapped()}
                        underlayColor='#f194ff'>
                        <Text style={styles.featureTitleText}>Log out</Text>
                    </TouchableOpacity>
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
    featureButton:{
        padding:10,
        alignSelf:'center',
        paddingBottom:10,
        backgroundColor:'#3C437D',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 20,
        marginBottom: 10,
        width: '75%'
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