import AsyncStorage from '@react-native-async-storage/async-storage';


class CioKeyValueStorage {

  // Tracking URL
  async saveTrackingUrl(value) {
    try {
      await AsyncStorage.setItem('tracking_url', value)
    } catch (e) {
      console.log(e)
    }
  }

  async getTrackingUrl(){
    try {
      const value = await AsyncStorage.getItem('tracking_url')
      return value
    } catch(e) {
      console.log(e)
    }
  }

  // BG-Q
  async saveBGQSecondsDelay(value) {
    try {
      await AsyncStorage.setItem('bgQSecondsDelay', value)
    } catch (e) {
      console.log(e)
    }
  }

  async getBGQSecondsDelay(){
    try {
      const value = await AsyncStorage.getItem('bgQSecondsDelay')
      return value
    } catch(e) {
      console.log(e)
    }
  }

  async saveBGQMinTasksInQueue(value) {
    try {
      await AsyncStorage.setItem('bgQMinTasksInQueue', value)
    } catch (e) {
      console.log(e)
    }
  }

  async getBGQMinTasksInQueue(){
    try {
      const value = await AsyncStorage.getItem('bgQMinTasksInQueue')
      return value
    } catch(e) {
      console.log(e)
    }
  }

  // Login Status
  async saveLoginStatus(value) {
    try {
      await AsyncStorage.setItem('loginStatus', JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  async getLoginStatus(value) {
    try {
      const value = await AsyncStorage.getItem('loginStatus')
      return value
    } catch(e) {
      console.log(e)
    }
  }
}

export default CioKeyValueStorage;