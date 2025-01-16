import { useState, useEffect, useRef } from 'react';
import BackgroundTimer from 'react-native-background-timer';

const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const apiIntervalRef = useRef<number | null>(null);

  const postUserData = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "morpheus",
          job: "leader"
        })
      });
      const data = await response.json();
      console.log('API Response:', data);
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
      }, 3000);
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
  };

  return { isRunning, elapsedTime, start, stop, reset };
};

export default useTimer;