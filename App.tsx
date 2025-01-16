import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import Timer from './src/components/Timer';

const App = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;