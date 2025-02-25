import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, PermissionsAndroid, Button, Text, View } from 'react-native';
import useBackgroundService from './src/utils/useBackgroundService';


const App = () => {
  const { backgroundTask, startBackgroundTask, stopBackgroundTask,
    name, xTimeHitApi, elapsedTime
  } = useBackgroundService();
  useEffect(() => {
    requestPermissions();
  }, []);



  // const onStartActivity = () => {
  //   FoodDelivery.startActivity();
  // };

  // const onEndActivity = () => {
  //   FoodDelivery.endActivity();
  // };

  // const updateActivity = () => {
  //   FoodDelivery.updateActivity('Updated Activity');
  // };

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 20, color: 'white' }}>Name: {name || '-'}</Text>
      <Text style={{ fontSize: 20, color: 'white' }}>Time Hit Api {xTimeHitApi}</Text>
      <Text style={{ fontSize: 20, color: 'white' }}  >Elapsed Time {elapsedTime}</Text>
      </View>
      <Button
        title="Stop Sync"
        onPress={stopBackgroundTask}
      />
      <Button
        title="Start Sync"
        onPress={startBackgroundTask}
      />
      {/* <Timer /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;