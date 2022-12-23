import UserNotifications
import CioMessagingPush
import CioTracking

class NotificationService: UNNotificationServiceExtension {
   
      override func didReceive(_ request: UNNotificationRequest,
                               withContentHandler contentHandler:
                               @escaping (UNNotificationContent) -> Void) {
        
        // TODO: Add Env.swift and fetch values from file, update values from CI secret keys
        CustomerIO.initialize(siteId: "", apiKey: "", region: .US) { config in
          config.autoTrackDeviceAttributes = true
          config.logLevel = .debug
        }
        MessagingPush.shared.didReceive(request, withContentHandler: contentHandler)
      }
  
      override func serviceExtensionTimeWillExpire() {
        MessagingPush.shared.serviceExtensionTimeWillExpire()
      }
  
}
   
