import { useState, useEffect, useRef } from 'react';
import notifee, { 
  AndroidColor, 
  AndroidImportance,
  EventType 
} from '@notifee/react-native';
import BackgroundTimer from 'react-native-background-timer';

const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const apiIntervalRef = useRef<number | null>(null);
  const [name, setName] = useState('');

  const updateNotification = async () => {
    try {
      const channelId = await notifee.createChannel({
        id: 'timer',
        name: 'Timer Channel',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        id: 'timer',
        title: `Time Tracker ${isRunning ? 'Running' : 'Stopped'}`,
        body: `Elapsed Time: ${formatTime(elapsedTime)}`,
        android: {
          channelId,
          asForegroundService: true,
          color: AndroidColor.WHITE,
          colorized: true,
          ongoing: true,
          pressAction: {
            id: 'default',
          },
          actions: [
            {
              title: isRunning ? 'Stop' : 'Start',
              pressAction: {
                id: 'toggle',
              },
            },
            {
              title: 'Reset',
              pressAction: {
                id: 'reset',
              },
            },
          ],
        },
      });
    } catch (error) {
      console.error('Notification Error:', error);
    }
  };

  useEffect(() => {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.ACTION_PRESS) {
        if (detail.pressAction?.id === 'toggle') {
          isRunning ? stop() : start();
        }
        if (detail.pressAction?.id === 'reset') {
          reset();
        }
      }
    });
  }, []);

  function generateRandomName(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const postUserData = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: generateRandomName(10),
          job: "leader"
        })
      });
      const data = await response.json();
      setName(data?.name)
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = BackgroundTimer.setInterval(() => {
        setElapsedTime(prev => prev + 1);
        updateNotification();
      }, 1000);
      apiIntervalRef.current = BackgroundTimer.setInterval(() => {
              postUserData();
            }, 5000);
    } else {
      if (intervalRef.current) {
        BackgroundTimer.clearInterval(intervalRef.current);
      }
    }

    updateNotification();

    return () => {
      if (intervalRef.current) {
        BackgroundTimer.clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    stop();
    setElapsedTime(0);
    updateNotification();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return { isRunning, elapsedTime, start, stop, reset, name };
};

export default useTimer;