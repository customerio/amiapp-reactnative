import React from 'react'
import { View, StyleSheet, Text} from 'react-native';

const ViewLogs = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.textLabel}>
        [CIO] (siteid:94541) added queue task data 
2023-01-02 21:43:46.286381+0530 SampleApp[38143:31476366] [CIO] (siteid:94541) processing queue status QueueStatus(queueId: "94541e1bbff594682089", numTasksInQueue: 1).
2023-01-02 21:43:46.286491+0530 SampleAp        
    </Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#333333"
    },
    textLabel: {
        padding: 20,
        color: '#fff',
        lineHeight: 25
    }
})
export default ViewLogs;