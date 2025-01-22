import Foundation
import React
import ActivityKit

@objc(TimerActivityModule)
class TimerActivityModule: NSObject {
  var activity: Activity<TimerAttributes>?
  
  @objc
  func startTimer(_ initialTime: Int, resolver: @escaping RCTPromiseResolveBlock, 
                  rejecter: @escaping RCTPromiseRejectBlock) {
    let attributes = TimerAttributes()
    let state = TimerAttributes.ContentState(timeElapsed: initialTime, isRunning: true)
    
    do {
      activity = try Activity.request(attributes: attributes, 
                                    contentState: state)
      resolver(nil)
    } catch {
      rejecter("error", error.localizedDescription, error)
    }
  }
  
  @objc
  func updateTimer(_ time: Int, isRunning: Bool) {
    Task {
      let state = TimerAttributes.ContentState(timeElapsed: time, 
                                             isRunning: isRunning)
      await activity?.update(using: state)
    }
  }
  
  @objc
  func endTimer() {
    Task {
      await activity?.end()
    }
  }
}