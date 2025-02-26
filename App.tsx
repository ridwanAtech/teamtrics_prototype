import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, PermissionsAndroid, NativeModules, Button, View } from 'react-native';
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
    <View style={styles.container}>
      <Timer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;