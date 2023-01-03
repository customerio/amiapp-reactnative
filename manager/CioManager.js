import {CustomerIO} from 'customerio-reactnative'

class CioManager {
 
    randomEvent() {
        CustomerIO.track("RandomEvent")
    }

    customEvent() {
        
    }
}

export default CioManager