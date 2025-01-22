import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useTimer from '../hooks/useTimer';
import { TimerActivity } from '../hooks/NativeTimerActivity';
import { NativeModules } from 'react-native';



const Timer = () => {
  const { LiveActivity } = NativeModules;
  const { isRunning, elapsedTime, start, stop, reset, name } = useTimer();


  useEffect(() => {
    const initLiveActivity = async () => {
      try {
        const result = await LiveActivity.startActivity();
        console.log('LiveActivity Result:', result);
      } catch (error) {
        console.error('LiveActivity Error:', error);
      }
    };

    initLiveActivity();
  }, [LiveActivity]);

  useEffect(() => {
    return () => {
    };
  }, []);

  const startForegroundService = async () => {
    start();
    TimerActivity.startTimer(elapsedTime)
  };

  useEffect(() => {
    TimerActivity.updateTimer(elapsedTime || 0, isRunning)
  }, [elapsedTime, isRunning])

  const stopForegroundService = async () => {
    TimerActivity.endTimer()
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
      <Text>Name: {name}</Text>
      <Button 
        onPress={isRunning ? stopForegroundService : startForegroundService} 
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