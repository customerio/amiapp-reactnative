import React, {useLayoutEffect} from 'react'
import { View, Text, TextInput, StyleSheet, YellowBox} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ThemedButton from './common/Button'

const CustomDataScreen = ({route, navigation}) => {
    const { featureType } = route.params

    const sendEventTapped = () => {
        alert("Custom event")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShadowVisible: false,
        })
      }, [navigation])

    const getHeaderTitle = () => {
        switch (featureType){
            case "Custom Event":
                return "Send Custom Events"
            case "Device Attributes":
                return "Set Custom Device Attributes"    
            
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.eventView}>
                    <Text style={styles.title}>
                            {getHeaderTitle()}
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
                    {/* <TouchableOpacity
                        style={styles.featureButton}
                        onPress={() => sendEventTapped()}
                        underlayColor='#f194ff'>
                        <Text style={styles.featureTitleText}>Send Event</Text>
                    </TouchableOpacity>
                    
                    */}

                    <ThemedButton
                    title ="Send Event"
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