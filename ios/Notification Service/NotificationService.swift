import UserNotifications

class NotificationService: UNNotificationServiceExtension {
   
  var contentHandler : ((UNNotificationContent) -> Void)?
      var content        : UNMutableNotificationContent?
      
      override func didReceive(_ request: UNNotificationRequest,
                               withContentHandler contentHandler:
                               @escaping (UNNotificationContent) -> Void) {
        
//        self.contentHandler = contentHandler
//        self.content        = (request.content.mutableCopy()
//                               as? UNMutableNotificationContent)
//
//        if let _ = self.content {
//
//
//          DispatchQueue.main.async {
//            guard let content = (request.content.mutableCopy() as? UNMutableNotificationContent) else {
//              return self.exitNotification(request: request)
//            }
//            let userInfo : [AnyHashable: Any] = request.content.userInfo
//            guard let cio = userInfo["CIO"] as? [String:Any], let push = cio["push"] as? [String:Any], let attachmentURL = push["image"] as? String else {
//              return self.exitNotification(request: request)
//            }
//            guard let imageData = try? Data(contentsOf: URL(string: attachmentURL)!) else {
//              return self.exitNotification(request: request)
//            }
//            guard let attachment = self.saveImage("image.png", data: imageData, options: nil) else {
//              return self.exitNotification(request: request)
//            }
//            content.attachments = [attachment]
//            contentHandler(content)
//          }
//        }
      }
  
  func saveImage(_ identifier: String,
            data: Data, options: [AnyHashable: Any]?)
  -> UNNotificationAttachment? {
    let directory = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent(ProcessInfo.processInfo.globallyUniqueString,
                                                                                        isDirectory: true)
    do {
      try FileManager.default.createDirectory(at: directory,
                                              withIntermediateDirectories: true,
                                              attributes: nil)
      let fileURL = directory.appendingPathComponent(identifier)
      try data.write(to: fileURL, options: [])
      return try UNNotificationAttachment.init(identifier: identifier,
                                               url: fileURL,
                                               options: options)
    } catch {}
    return nil
  }
  
  func exitNotification(_ reason: String = "", request: UNNotificationRequest) {
    if let bca    = request.content.mutableCopy() as? UNMutableNotificationContent {
      bca.title = reason
      contentHandler!(bca)
    }
  }
      
      override func serviceExtensionTimeWillExpire() {
//          if let contentHandler = contentHandler, let bca =  self.content {
//              contentHandler(bca)
//          }
      }
  
}
   
