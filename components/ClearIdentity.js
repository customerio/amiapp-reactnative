import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import FeatureButton from "./common/FeatureButton";
import { SubHeaderText } from "./common/Text";
import { CustomerIO } from 'customerio-reactnative';


const ClearIdentity = (props) => {

    const ClearUserIdentity = () => {
        // MARK:- CLEAR USER IDENTITY
        CustomerIO.clearIdentify()
        
        props.onClear()
    }

    return (
        <View style={styles.container}>
            <SubHeaderText label = "CLEAR USER IDENTITY"/>
            <View style={styles.innerContainer}>
                <FeatureButton
                title ="Clear user identity"
                style={{marginBottom: 20}}
                onPress = {() => ClearUserIdentity()}></FeatureButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 25
    },
    innerContainer: {
        marginTop: 5,
    },
    input: {
        height: 40,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderColor: '#e6e6e6',
        borderRadius: 10
      },
})

export default ClearIdentity;