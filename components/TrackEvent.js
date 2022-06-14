import React from 'react'
import { View, StyleSheet } from 'react-native'
import FeatureButton from './common/FeatureButton';
import { SubHeaderText } from './common/Text';
import { CustomerIO } from "customerio-reactnative";

const TrackEvent = () => {

    const trackEvent = (type) => {

        // Send random event
        switch (type) {
            case "Random" :
                CustomerIO.track("Button Click")
                break;
            case "EventWithData":
                const trackEventAttributes = {
                  clicked : type,
                  name : "Super Ami",
                  country : "India",
                  city : "New Delhi",
                };
                CustomerIO.track("Data Event", trackEventAttributes)
                break;
            case "Shopping":
                const shoppingEventAttributes = {
                    clicked : type,
                    product : "Clothing",
                    price : "INR 999",
                    brand : "Trends",
                    detail : {
                        color : "Orange",
                        size : 30,
                        length : 34,
                        isNew : true
                    }
                  };
                CustomerIO.track("Shopping", shoppingEventAttributes)
                break;
            case "Charity":
                const charityEventAttributes = {
                    clicked : type,
                    org : "Percent Pledge",
                    amount : "INR 500",
                    to : "Urban Trees",
                    verified : false
                    };
                CustomerIO.track("Charity", charityEventAttributes)
                break;
            
        }
        
        alert(type + " event tracked")
    }

  return (
    <View style={styles.container}>
        <SubHeaderText label = "TRACK EVENT"/>
        <View style={styles.row}>
            <FeatureButton title="Any event" onPress={() => trackEvent("Random")}></FeatureButton>
            <FeatureButton title="Event with data" onPress={() => trackEvent("EventWithData")}></FeatureButton>
            
        </View>
        <View style={styles.row}>
            <FeatureButton title="Shopping" style={{marginBottom: 20}} onPress={() => trackEvent("Shopping")}></FeatureButton>
            <FeatureButton title="Charity event" onPress={() => trackEvent("Charity")} ></FeatureButton>
        </View>
    </View>
  )
}

export default TrackEvent;

const styles = StyleSheet.create({
    container : {
        flex: 2,
        width: '100%',
        height: '20%',
        flexDirection : 'column',
        backgroundColor: 'white',
        borderRadius: 25
    },
    row: {
        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-evenly',

    }
})