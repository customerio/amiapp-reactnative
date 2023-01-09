#import "AppDelegate.h"
#import "SampleApp-Swift.h"
// MARK: - CIO-TECH-ASSISTANCE
// Import "Your-project-name-Swift.h" file



@interface AppDelegate ()

@end
@implementation AppDelegate

AmiAppCioManager* cioManagerObj = nil;
+ (void)initialize {
  cioManagerObj = [[AmiAppCioManager alloc] init];
}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    // MARK: - CIO-TECH-ASSISTANCE
    // 1. Register push notifications
    // 2. Initialise CIO SDK
    // 3. Identify user using CIO SDK
//    AmiAppCioManager* cioManagerObj = [[AmiAppCioManager alloc] init];
    [cioManagerObj registerPushNotification:self];
    [cioManagerObj initialiseCIO];
    [cioManagerObj identify:@"UserIdentity" id:@"userId@yourcompany.com"];
    return YES;
}


#pragma mark - UISceneSession lifecycle


- (UISceneConfiguration *)application:(UIApplication *)application configurationForConnectingSceneSession:(UISceneSession *)connectingSceneSession options:(UISceneConnectionOptions *)options {
    // Called when a new scene session is being created.
    // Use this method to select a configuration to create the new scene with.
    return [[UISceneConfiguration alloc] initWithName:@"Default Configuration" sessionRole:connectingSceneSession.role];
}


- (void)application:(UIApplication *)application didDiscardSceneSessions:(NSSet<UISceneSession *> *)sceneSessions {
    // Called when the user discards a scene session.
    // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
    // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
}

// MARK: - Push Notification
// MARK: - CIO-TECH-ASSISTANCE
// Add the following two functions for push notifications
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    // Register device to receive push notifications with device token
    AmiAppCioManager* cioManagerObj = [[AmiAppCioManager alloc] init];
  [cioManagerObj application:application deviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    
    AmiAppCioManager* cioManagerObj = [[AmiAppCioManager alloc] init];
    [cioManagerObj application:application error:error];
}

// MARK: - CIO-TECH-ASSISTANCE
// To handle push when the user responds to the notification
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)(void))completionHandler {
    
    AmiAppCioManager* cioManagerObj = [[AmiAppCioManager alloc] init];
  [cioManagerObj userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
// (Optional) To show push when the app is in foreground
- (void)userNotificationCenter:(UNUserNotificationCenter* )center willPresentNotification:(UNNotification* )notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
    
    completionHandler( UNNotificationPresentationOptionList | UNNotificationPresentationOptionBanner + UNNotificationPresentationOptionSound);
}

@end
