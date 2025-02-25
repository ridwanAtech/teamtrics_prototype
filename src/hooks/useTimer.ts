import { useState, useEffect, useRef } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import BackgroundFetch from 'react-native-background-fetch';
import notifee, { AndroidColor, AndroidImportance, EventType } from '@notifee/react-native';

async function checkApplicationPermission() {
  // const settings = await notifee.requestPermission();

  // if (settings.authorizationStatus) {
  // } else {
  // }

}



const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const apiIntervalRef = useRef<number | null>(null);
  const [name, setName] = useState('');
  const [counterHowManyTimesHitApi, setCounterHowManyTimesHitApi] = useState(0);

  const updateNotification = async () => {
    // try {
    //   const channelId = await notifee.createChannel({
    //     id: 'timer123',
    //     name: 'Timer Channel',
    //     importance: AndroidImportance.HIGH,
    //   });

    //   await notifee.displayNotification({
    //     id: 'timer',
    //     title: `Time Tracker ${isRunning ? 'Running' : 'Stopped'}`,
    //     body: `Elapsed Time: ${elapsedTime}`,
    //     android: {
    //       channelId,
    //       asForegroundService: true,
    //       color: AndroidColor.WHITE,
    //       colorized: true,
    //       ongoing: true,
    //       pressAction: {
    //         id: 'default',
    //       },
    //       actions: [
    //         {
    //           title: isRunning ? 'Stop' : 'Start',
    //           pressAction: {
    //             id: 'toggle',
    //           },
    //         },
    //         {
    //           title: 'Reset',
    //           pressAction: {
    //             id: 'reset',
    //           },
    //         },
    //       ],
    //     },
    //   });
    // } catch (error) {
    //   console.log('Notification Error:', error);
    // }
  };


  // Konfigurasi awal
  // BackgroundFetch.configure({
  //   minimumFetchInterval: 15, // Minimum 15 menit (iOS)
  //   stopOnTerminate: false,
  //   startOnBoot: true,
  // }, async (taskId) => {
  //   console.log('Background fetch started 1233', taskId);

  //   try {
  //     // Lakukan API call di sini
  //     console.log('ass')

  //     // Update data lokal/state (gunakan AsyncStorage atau lainnya)
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //   } finally {
  //     BackgroundFetch.finish(taskId);
  //   }
  // });

  BackgroundFetch.status((status) => {
    switch(status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        console.log("BackgroundFetch restricted");
        break;
      case BackgroundFetch.STATUS_DENIED:
        console.log("BackgroundFetch denied");
        break;
      case BackgroundFetch.STATUS_AVAILABLE:
        console.log("BackgroundFetch is enabled");
        break;
    }
  });

  // Start background fetch
  


  const fetchBackground = async () => {
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
      // setName(data?.name)
      // setCounterHowManyTimesHitApi(prev => prev + 1)
      // notifee.displayNotification({
      //   id: 'timer',
      //   title: `Time Tracker ${isRunning ? 'Running' : 'Stopped'}`,
      //   body: `Elapsed Time: ${elapsedTime} Name is ${data?.name} and counterHowManyTimesHitApi is ${counterHowManyTimesHitApi}`,
      //   android: {
      //     channelId: 'timer' + new Date().getTime(),
      //     asForegroundService: true,
      //     color: AndroidColor.WHITE,
      //     colorized: true,
      //     ongoing: true,
      //     pressAction: {
      //       id: 'default',
      //     },
      //     actions: [
      //       {
      //         title: isRunning ? 'Stop' : 'Start',
      //         pressAction: {
      //           id: 'toggle',
      //         },
      //       },
      //       {
      //         title: 'Reset',
      //         pressAction: {
      //           id: 'reset',
      //         },
      //       },
      //     ]
      //   }
      // });
    } catch (error) {
      console.error(error);
    }
  };

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
      setCounterHowManyTimesHitApi(prev => prev + 1)
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    initBackgroundFetch();
  }, []);

  const initBackgroundFetch = async () => {
    const status:number = await BackgroundFetch.configure({
      minimumFetchInterval: 15      // <-- minutes (15 is minimum allowed)
    }, async (taskId:string) => {
      console.log('******************* [BackgroundFetch] taskId', taskId);
      // Finish.
      BackgroundFetch.finish(taskId);
    }, (taskId:string) => {
      // Oh No!  Our task took too long to complete and the OS has signalled
      // that this task must be finished immediately.
      console.log('******************* [BackgroundFetch] TIMEOUT taskId:', taskId);
      BackgroundFetch.finish(taskId);
    });    
  }

  // useEffect(() => {
  //   if (isRunning) {
  //     console.log('Background fetch started');
  //     BackgroundFetch.start();
  //   } else {
  //     BackgroundFetch.stop();
  //   }
  // }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    stop();
    setElapsedTime(0);
    setName('')
    setCounterHowManyTimesHitApi(0)
  };

  return { isRunning, elapsedTime, start, stop, reset, name, counterHowManyTimesHitApi };
};

export default useTimer;