import { useState, useEffect, useRef } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import notifee, { AndroidColor, AndroidImportance, EventType } from '@notifee/react-native';

async function checkApplicationPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus) {
  } else {
  }

}



const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [xTimesHitApi, setXTimesHitApi] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const apiIntervalRef = useRef<number | null>(null);
  const [name, setName] = useState('');

  const updateNotification = async () => {
    try {
      const channelId = await notifee.createChannel({
        id: 'timer123',
        name: 'Timer Channel',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        id: 'timer',
        title: `Time Tracker ${isRunning ? 'Running' : 'Stopped'}`,
        body: `Elapsed Time: ${elapsedTime} || Name is ${name || '-'} || x times hit api ${xTimesHitApi}`,
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
      console.log('Notification Error:', error);
    }
  };


  useEffect(() => {
    checkApplicationPermission()
    updateNotification();
  },[])

  useEffect(() => {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.ACTION_PRESS) {
        if (detail.pressAction?.id === 'toggle') {
          console.log('toggle')
          isRunning ? stop() : start();
        }
        if (detail.pressAction?.id === 'reset') {
          reset();
        }
      }
    });
  }, [isRunning]);

  useEffect(() => {
    notifee.onForegroundEvent(({ type, detail }) => {
      if (detail.pressAction?.id === 'toggle') {
        isRunning ? stop() : start();
      }
      if (detail.pressAction?.id === 'reset') {
        reset();
      }
    });
  }, [])

  useEffect(() => {
    updateNotification();
  }, [isRunning, elapsedTime]);

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
      setXTimesHitApi(prev => prev + 1)
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = BackgroundTimer.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);

      apiIntervalRef.current = BackgroundTimer.setInterval(() => {
        postUserData();
      }, 5000);
    } else {
      if (intervalRef.current) {
        BackgroundTimer.clearInterval(intervalRef.current);
      }
      if (apiIntervalRef.current) {
        BackgroundTimer.clearInterval(apiIntervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        BackgroundTimer.clearInterval(intervalRef.current);
      }
      if (apiIntervalRef.current) {
        BackgroundTimer.clearInterval(apiIntervalRef.current);
      }
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    stop();
    setElapsedTime(0);
    setName('')
  };

  return { isRunning, elapsedTime, start, stop, reset, name};
};

export default useTimer;