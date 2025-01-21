/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import notifee, { EventType } from '@notifee/react-native';

// Create the task runner
notifee.registerForegroundService((notification) => {
  return new Promise(() => {
    notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'stop') {
        await notifee.stopForegroundService()
      }
    });
  });
});



AppRegistry.registerComponent(appName, () => App);
