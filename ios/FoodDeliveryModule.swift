@objc(FoodDelivery)
class FoodDelivery: NSObject {
  // Add module registration
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  // Complete the unfinished updateActivity method
  @objc(updateActivity:)
  func updateActivity(name: String) {
    if #available(iOS 16.1, *) {
      Task {
        for activity in Activity<FoodDeliveryAttributes>.activities {
          let state = FoodDeliveryAttributes.ContentState(leadingName: name)
          await activity.update(using: state)
        }
      }
    }
  }
  
  // Add missing endActivity method
  @objc(endActivity)
  func endActivity() {
    if #available(iOS 16.1, *) {
      Task {
        for activity in Activity<FoodDeliveryAttributes>.activities {
          await activity.end()
        }
      }
    }
  }
}