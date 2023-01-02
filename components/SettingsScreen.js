import React, {useLayoutEffect} from 'react'
import { View, StyleSheet, Text} from 'react-native';

const SettingsScreen = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    })
  }, [navigation])

  return (
    <View style={styles.container}>
       <View style={{flex:1,backgroundColor:'white', paddingTop: 50}}>
              <View style={{justifyContent:'space-around'}}>
                  <Text> Settings</Text>
            </View>
        </View> 
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fff"
    },
    textLabel: {
        padding: 20,
        color: '#fff',
        lineHeight: 25
    }
})
export default SettingsScreen;