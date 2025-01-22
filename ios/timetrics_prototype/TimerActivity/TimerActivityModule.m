#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TimerActivityModule, NSObject)

RCT_EXTERN_METHOD(startTimer:(NSInteger)initialTime
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(updateTimer:(NSInteger)time
                  isRunning:(BOOL)isRunning)

RCT_EXTERN_METHOD(endTimer)

@end