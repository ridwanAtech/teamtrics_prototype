import { NativeModules, Platform } from 'react-native';

const { TimerActivityModule } = NativeModules;

export const TimerActivity = {
  startTimer: async (initialTime: number): Promise<void> => {
    if (Platform.OS === 'ios') {
      return TimerActivityModule.startTimer(initialTime);
    }
  },
  
  updateTimer: (time: number, isRunning: boolean): void => {
    console.log('update', TimerActivityModule)
    if (Platform.OS === 'ios') {
      TimerActivityModule?.updateTimer?.(time || 0, isRunning);
    }
  },
  
  endTimer: (): void => {
    if (Platform.OS === 'ios') {
      TimerActivityModule.endTimer();
    }
  }
};