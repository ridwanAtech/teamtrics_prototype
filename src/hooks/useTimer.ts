import { useState, useEffect, useRef } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import notifee, { EventType } from '@notifee/react-native';

async function checkApplicationPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus) {
    console.log('User has notification permissions enabled');
  } else {
    console.log('User has notification permissions disabled');
  }

  console.log('iOS settings: ', settings.ios);
}

async function getExistingSettings() {
  const settings = await notifee.getNotificationSettings();

  if (settings) {
    console.log('Current permission settings: ', settings);
  }
}


const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const apiIntervalRef = useRef<number | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    checkApplicationPermission()
  },[])

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