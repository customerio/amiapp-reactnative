import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, YellowBox} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CustomDataScreen = () => {


    const sendEventTapped = () => {
        alert("Custom event")
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.eventView}>
                    <Text style={styles.title}>
                            Send Custom Event
                    </Text>
                    <View style={styles.eventRowView}>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.eventTitle}>Event Name</Text>
                        </View>
                        <View style={{flex: 0.5,alignItems:'flex-end'}}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setName(e.value)}
                            value="khk"
                            placeholder='John D'
                            />
                        </View>
                    </View>

                    <View style={styles.eventRowView}>
                    <View style={{flex: 0.5}}>

                        <Text style={styles.eventTitle}>Property Name</Text>
                        </View>
                        <View style={{flex: 0.5,alignItems:'flex-end'}}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setName(e.value)}
                            value="khk"
                            placeholder='John D'
                            />
                        </View>
                    </View>
                    <View style={styles.eventRowView}>
                        <View style={{flex: 0.5}}>
                            <Text style={styles.eventTitle}>Property Value</Text>
                        </View>
                        <View style={{flex: 0.5, alignItems:'flex-end'}}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setName(e.value)}
                            value="khk"
                            placeholder='John D'
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.featureButton}
                        onPress={() => sendEventTapped()}
                        underlayColor='#f194ff'>
                        <Text style={styles.featureTitleText}>Send Event</Text>
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
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        bottom: 50
    },
    eventView:{
        width: '80%',
        backgroundColor:'yellow'
    },
    eventRowView: {
        flexDirection: 'row',
        alignItems:'center',
        paddingBottom: 9,
    },
    input: {
        height: 40,
        marginLeft: 20,
        marginTop:3,
        borderWidth: 1,
        borderRadius:5,
        borderColor:"#ebecf2",
        padding: 10,
        fontFamily:'Avenir',
        color: '#4b4b60',
        width: '100%',
      },
      eventTitle: {
        fontSize: 15
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
})


export default CustomDataScreen;