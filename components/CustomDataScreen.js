import React, {useLayoutEffect, useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ThemedButton from './common/Button'

const CustomDataScreen = ({route, navigation}) => {
    const { featureType } = route.params

    const [title, setTitle] = useState('')
    const [propertyLabel, setPropertyLabel] = useState('')
    const [showEventName, setShowEventName] = useState(true)
    const [buttonText, setButtonText] = useState('')

    useEffect(() => {
        switch (featureType){
            case "Custom Event":
                setTitle("Send Custom Events")
                setPropertyLabel("Property")
                setShowEventName(true)  
                setButtonText("event")
                break
            case "Device Attributes":
                setTitle("Set Custom Device Attributes")
                setPropertyLabel("Attribute")
                setShowEventName(false)  
                setButtonText("device attributes")
                break
            case "Profile Attributes":
                setTitle("Set Custom Profile Attributes")
                setPropertyLabel("Attribute")
                setShowEventName(false)  
                setButtonText("profile attributes")
                break
        }
    }, [featureType])
    
    const sendEventTapped = () => {
        alert("Custom event")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShadowVisible: false,
        })
      }, [navigation])

    const getHeaderTitle = () => {
        
    }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.eventView}>
                    <Text style={styles.title}>
                            {title}
                    </Text>
                    
                    { showEventName && 
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
                    }
                    <View style={styles.eventRowView}>
                    <View style={{flex: 0.5}}>

                        <Text style={styles.eventTitle}>{propertyLabel} Name</Text>
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
                            <Text style={styles.eventTitle}>{propertyLabel} Value</Text>
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
                    <ThemedButton
                    title ={`Send ${buttonText}`}
                    onPress={() => sendEventTapped()}></ThemedButton>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: '#fff'
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
        paddingBottom: 40
    },
    eventView:{
        width: '80%',
        alignContent:'center',
        justifyContent:"center",
        bottom: 50
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
      }
})


export default CustomDataScreen;