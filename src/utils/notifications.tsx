import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

export const displayNotification = async (isRunning: boolean, start: () => void, stop: () => void) => {
  await notifee.requestPermission();

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: 'Time Tracker',
    body: isRunning ? 'Timer is running' : 'Timer is stopped',
    android: {
      channelId: 'default',
      actions: [
        {
          title: isRunning ? 'Stop' : 'Start',
          pressAction: {
            id: isRunning ? 'stop' : 'start',
          },
        },
      ],
    },
  });

  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS) {
      if (detail.pressAction && detail.pressAction.id === 'start') {
        start();
      } else if (detail.pressAction && detail.pressAction.id === 'stop') {
        stop();
      }
    }
  });
};