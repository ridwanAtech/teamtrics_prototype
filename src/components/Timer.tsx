import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useTimer from '../hooks/useTimer';
import { TimerActivity } from '../hooks/NativeTimerActivity';
import BackgroundFetch from 'react-native-background-fetch';
// import { NativeModules } from 'react-native';



const Timer = () => {
  const { isRunning, elapsedTime, start, stop, reset, name, counterHowManyTimesHitApi } = useTimer();

  useEffect(() => {
    return () => {
    };
  }, []);

  const startForegroundService = async () => {
    start();
    // TimerActivity.startTimer(elapsedTime)
  };

  // useEffect(() => {
  //   TimerActivity.updateTimer(elapsedTime || 0, isRunning)
  // }, [elapsedTime, isRunning])

  const stopForegroundService = async () => {
    // TimerActivity.endTimer()
    stop();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
      <Text>Name From Hit API: {name}</Text>
      <Text>Counter How Many Times Hit Api: {counterHowManyTimesHitApi}</Text>
      <Button 
        // onPress={isRunning ? stopForegroundService : startForegroundService} 
        onPress={() => BackgroundFetch.scheduleTask({
          taskId: 'org.reactjs.native.example.timetrics-prototype.manual-test', 
          delay: 60 * 15, // Minimal 15 menit untuk iOS
          periodic: false
        })}
        title={isRunning ? 'Stop' : 'Start'} 
      />
      <Button onPress={reset} title="Reset" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    marginBottom: 20,
  },
});

export default Timer;