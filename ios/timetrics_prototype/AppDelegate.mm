#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <TSBackgroundFetch/TSBackgroundFetch.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Ganti dengan ini:
  // Registrasi task yang benar
  // Inisialisasi library
  // [REQUIRED] Register BackgroundFetch
  // Registrasi Task ID dengan format reverse-DNS
  [[TSBackgroundFetch sharedInstance] didFinishLaunching];
  self.moduleName = @"timetrics_prototype";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
