import SwiftUI
import ActivityKit

struct TimerLiveActivity: Widget {
  var body: some WidgetConfiguration {
    ActivityConfiguration(for: TimerAttributes.self) { context in
      HStack {
        Text(formatTime(context.state.timeElapsed))
        if context.state.isRunning {
          Button("Stop") { /* handled by React Native */ }
        } else {
          Button("Start") { /* handled by React Native */ }
        }
      }
    } dynamicIsland: { context in
      DynamicIsland {
        DynamicIslandExpandedRegion(.center) {
          Text(formatTime(context.state.timeElapsed))
        }
      } compactLeading: {
        Text("\(context.state.timeElapsed)")
      } compactTrailing: {
        Image(systemName: context.state.isRunning ? "stop.fill" : "play.fill")
      }
    }
  }
}