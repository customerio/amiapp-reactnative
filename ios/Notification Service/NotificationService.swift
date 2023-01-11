import Foundation
import UserNotifications
import CioTracking
import CioMessagingPushAPN

@objc
public class NotificationServiceCioManager : NSObject {

    public override init() {}

    @objc(didReceive:withContentHandler:)
    public func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {

      // TODO: Add Env.swift and fetch values from file, update values from CI secret keys
      CustomerIO.initialize(siteId: "94541e1bbff594682089", apiKey: "914ea21ebfa87bf771f4", region: .US) { config in
        config.autoTrackDeviceAttributes = true
        config.logLevel = .debug
      }
      MessagingPush.shared.didReceive(request, withContentHandler: contentHandler)
    }

    @objc(serviceExtensionTimeWillExpire)
    public func serviceExtensionTimeWillExpire() {
        MessagingPush.shared.serviceExtensionTimeWillExpire()
    }
}
