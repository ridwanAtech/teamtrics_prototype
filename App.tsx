import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, PermissionsAndroid, NativeModules, Button } from 'react-native';
import Timer from './src/components/Timer';

const {FoodDelivery} = NativeModules;

const App = () => {
  console.log('Food', FoodDelivery)
  useEffect(() => {
    requestPermissions();
  }, []);

  const onStartActivity = () => {
    FoodDelivery.startActivity();
  };

  const onEndActivity = () => {
    FoodDelivery.endActivity();
  };

  const updateActivity = () => {
    FoodDelivery.updateActivity('Updated Activity');
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Timer />
      <Button title="Start Activity" onPress={onStartActivity} />
      <Button title="Update Activity" onPress={updateActivity} />
      <Button title="End Activity" onPress={onEndActivity} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;