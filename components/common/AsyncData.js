
class AsyncData {

    static setTrackScreen = async (status) => {
        saveData('TrackScreen', status)
    }

    static setTrackScreen = async () => {
        return retrieveData('TrackScreen')
    }

    saveData = async (itemKey, status) => {
        try {
          await AsyncStorage.setItem(
            itemKey,
            status,
          );
        } catch (error) {
          // Error saving data
        }
      };
    
    retrieveData = async (itemKey) => {
        try {
          const value = await AsyncStorage.getItem(itemKey);
          if (value !== null) {
            // We have data!!
            console.log(value);
            return value
          }
        } catch (error) {
          // Error retrieving data
        }
      };
}


  export default {AsyncData};