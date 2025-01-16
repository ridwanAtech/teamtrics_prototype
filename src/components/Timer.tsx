import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useTimer from '../hooks/useTimer';


const Timer = () => {
  const { isRunning, elapsedTime, start, stop, reset } = useTimer();

  useEffect(() => {
    return () => {
    };
  }, []);

  const startForegroundService = async () => {
    start();
  };

  const stopForegroundService = async () => {
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