import Foundation
import React

@objc(LiveActivity)
class LiveActivity: NSObject {
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc(startActivity:rejecter:)
    func startActivity(_ resolve: @escaping RCTPromiseResolveBlock,
                      rejecter reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            print("LiveActivity Module Called")
            resolve("LiveActivity Connected")
        }
    }
}