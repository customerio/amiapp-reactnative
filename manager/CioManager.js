import {CustomerIO} from 'customerio-reactnative'

class CioManager {
 
    randomEvent() {
        CustomerIO.track("RandomEvent")
    }

    customEvent(name, data) {
        CustomerIO.track(name, data)
    }

    deviceAttributes(data) {
        CustomerIO.setDeviceAttributes(data)
    }

    profileAttributes(data) {
        CustomerIO.setProfileAttributes(data)
    }
}

export default CioManager