import Foundation
import CioTracking
import UserNotifications
import CioMessagingPushAPN
import UIKit

// MARK: - CIO-TECH-ASSISTANCE
// This class manages all function calls to CustomerIO SDK.
// AmiAppCioManager is just an example, you may add more functions as required,
// for example, tracking events, updating profile attributes etc
@objc
public class AmiAppCioManager : NSObject {
    
    public override init() {}
    
    @objc(initialiseCIO)
    public func initialiseCIO() {
        CustomerIO.initialize(siteId: "YOUR SITE ID", apiKey: "YOUR API KEY")
    }
    
    @objc(identify:id:)
    public func identify(name : String, emailid: String) {
        let body = ["first_name": name]
        CustomerIO.shared.identify(identifier: name, body: body)
    }
    
    // MARK: - Push Notification
    
    @objc(registerPushNotification:)
    public func registerPushNotification(withNotificationDelegate notificationDelegate: UNUserNotificationCenterDelegate) {
      
      let center  = UNUserNotificationCenter.current()
      center.delegate = notificationDelegate // MARK: - ObjCNEW
      center.requestAuthorization(options: [.sound, .alert, .badge]) { (granted, error) in
        if error == nil{
          DispatchQueue.main.async {
            UIApplication.shared.registerForRemoteNotifications()
          }
        }
      }
    }
    
    @objc(application:deviceToken:)
    public func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
      MessagingPush.shared.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
    }
    
    @objc(application:error:)
    public func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
      MessagingPush.shared.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
    }
    
    @objc(userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:)
    public func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
      let handled = MessagingPush.shared.userNotificationCenter(center, didReceive: response,
    withCompletionHandler: completionHandler)
      
      // If the Customer.io SDK does not handle the push, it's up to you to handle it and call the
      // completion handler. If the SDK did handle it, it called the completion handler for you.
      if !handled {
        completionHandler()
      }
    }
}
