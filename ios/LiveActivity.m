#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LiveActivity, NSObject)

RCT_EXTERN_METHOD(startActivity:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end