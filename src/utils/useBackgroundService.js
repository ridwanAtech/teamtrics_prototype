import { useState } from 'react';
import BackgroundService from 'react-native-background-actions';
const options = {
  taskName: 'BackgroundDataSync',
  taskTitle: 'Menyinkronkan Data',
  taskDesc: 'Sedang mengambil data terbaru...',
  taskIcon: {
    name: 'ic_sync',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourapp://sync',
  parameters: {
    interval: 900000 // 15 menit dalam milidetik (minimal iOS)
  },
};





const useBackgroundService = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [name, setName] = useState('');
  const [xTimeHitApi, setXTimeHitApi] = useState(0);
  let elapsedTimeIntervalId;
  let postUserDataIntervalId;


  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const displayNotificationNotifee = async () => {
    const channelId = await notifee.createChannel({
      id: 'timer123',
      name: 'Timer Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Timer',
      body: 'Timer is running',
      android: {
        channelId,
        color: AndroidColor.RED,
      },
    });
  }

  const stopBackgroundTask = async () => {
    await BackgroundService.stop();
    console.log('Background task stopped');
    setName('')
    setXTimeHitApi(0)
    setElapsedTime(0)
    clearInterval(elapsedTimeIntervalId);
    clearInterval(postUserDataIntervalId);
  };

  const startBackgroundTask = async () => {
    try {
      await BackgroundService.start(backgroundTask, options);
    } catch (error) {
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
      setXTimeHitApi((prev) => prev + 1)
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const backgroundTask = async (taskData) => {
    console.log('Background task started', BackgroundService.isRunning());
    while (BackgroundService.isRunning()) {
      try {

        elapsedTimeIntervalId = setInterval(() => {
          setElapsedTime((prev) => prev + 1); // You probably want to increment the elapsed time here
        }, 1000);

        postUserDataIntervalId = setInterval(() => {
          postUserData();
        }, 10000);

        // Lakukan HTTP request di sini
        //   const response = await fetch('https://api.example.com/data', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ lastSync: Date.now() })
        //   });

        //   const data = await response.json();

        // Update UI/state via EventEmitter jika diperlukan

        // BackgroundService.updateNotification({
        //   taskDesc: `Terakhir update: ${new Date().toLocaleTimeString()}`,
        // });

        console.log('Background fetch success:', 'abcddd');

      } catch (error) {
        console.error('Background fetch error:', error);
      }

      // Interval 15 menit (sesuai kebijakan iOS)
      await sleep(taskData.interval);
    }
  };

  return {
    backgroundTask,
    startBackgroundTask,
    stopBackgroundTask,
    elapsedTime,
    name,
    xTimeHitApi
  }
}

export default useBackgroundService