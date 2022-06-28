//
//  AppDelegate.swift
//  SampleApp
//
//  Created by Amandeep Kaur on 18/05/22.
//

import Foundation
import UIKit
import CioTracking
import CioMessagingPushAPN
import UserNotifications


@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {


  var window: UIWindow?

      func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
          let bridge = RCTBridge(delegate: self, launchOptions: launchOptions)!
          let rootView = RCTRootView(bridge: bridge, moduleName: "SampleApp", initialProperties: nil)
          rootView.backgroundColor = UIColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1)
          self.window = UIWindow(frame: UIScreen.main.bounds)
          let rootViewController = UIViewController()
          rootViewController.view = rootView
          self.window?.rootViewController = rootViewController
          self.window?.makeKeyAndVisible()
              
          // TODO: - Remove before final PR
        CustomerIO.config{
          $0.logLevel = .debug
        }
          registerForPushNotifications()
          return true
      }
  
  func registerForPushNotifications() {
      let center  = UNUserNotificationCenter.current()
      center.delegate = self
      center.requestAuthorization(options: [.sound, .alert, .badge]) { (granted, error) in
        if error == nil{
          DispatchQueue.main.async {
            UIApplication.shared.registerForRemoteNotifications()
          }
        }
      }
  }
  
  // PUSH NOTIFICATIONS
  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
      MessagingPush.shared.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
  }

  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
      MessagingPush.shared.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
  }
}

extension AppDelegate: RCTBridgeDelegate {
    func sourceURL(for bridge: RCTBridge!) -> URL! {
        return RCTBundleURLProvider.sharedSettings()?.jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
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
