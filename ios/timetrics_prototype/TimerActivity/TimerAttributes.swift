//
//  TimerAttributes.swift
//  timetrics_prototype
//
//  Created by Eki Rifaldi on 21/01/25.
//
import ActivityKit
import Foundation

@available(iOS 16.1, *)
struct TimerAttributes: ActivityAttributes {
    public typealias TimerStatus = ContentState

    public struct ContentState: Codeable, Hashable {
        var elapsedTime: Int
        var isRunning: Bool
    }
    
}