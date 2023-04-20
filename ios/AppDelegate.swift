import Foundation
import UIKit
import CioTracking
import CioMessagingPushAPN
import UserNotifications
import FirebaseCore

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
    var newLaunchOptions = launchOptions
    if let launch = launchOptions {
      if launch[UIApplication.LaunchOptionsKey.remoteNotification] != nil{
        if let remoteNotif = launch[UIApplication.LaunchOptionsKey.remoteNotification] as? [String: Any] {
          
          if let initialUrl = remoteNotif["react-deep-link"] as? String{
            if let url = launch[UIApplication.LaunchOptionsKey.url] as? String {
              UIPasteboard.general.string = "\(url)"
            }
            newLaunchOptions![UIApplication.LaunchOptionsKey.url] = NSURL(string: initialUrl)
          }
        }
      }
    }
    
    
    let bridge = RCTBridge(delegate: self, launchOptions: newLaunchOptions)!
    let rootView = RCTRootView(bridge: bridge, moduleName: "SampleApp", initialProperties: nil)
    rootView.backgroundColor = UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1)
    self.window = UIWindow(frame: UIScreen.main.bounds)
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()
    
    // Set delegate for UNUserNotificationCenter
    UNUserNotificationCenter.current().delegate = self

    // firebase used for app distribution.
    // FirebaseApp.configure(options: options)
    return true
  }
  
  // PUSH NOTIFICATIONS
  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
      MessagingPush.shared.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
  }

  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
      MessagingPush.shared.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
  }
  
  func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool
  {
    return RCTLinkingManager.application(app, open: url, options: options)
  }
  
  func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool
  {
    return RCTLinkingManager.application(application, continue: userActivity, restorationHandler: restorationHandler)
  }
}

extension AppDelegate: RCTBridgeDelegate {
    func sourceURL(for bridge: RCTBridge!) -> URL! {
      
      return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    }
}

extension AppDelegate: UNUserNotificationCenterDelegate {
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        let handled = MessagingPush.shared.userNotificationCenter(center, didReceive: response,
                                                                  withCompletionHandler: completionHandler)

        // If the Customer.io SDK does not handle the push, it's up to you to handle it and call the
        // completion handler. If the SDK did handle it, it called the completion handler for you.
        if !handled {
            completionHandler()
        }
    }
  
  // OPTIONAL: If you want your push UI to show even with the app in the foreground, override this function and call
  // the completion handler.
  @available(iOS 10.0, *)
  func userNotificationCenter(
      _ center: UNUserNotificationCenter,
      willPresent notification: UNNotification,
      withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
  ) {
      completionHandler([.list, .banner, .badge, .sound])
  }
  
}
