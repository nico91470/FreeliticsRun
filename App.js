import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, StatusBar } from 'react-native';
import * as Location from 'expo-location'

import Run from './components/Run'

export default function App() {

  const [ready, setReady] = useState(false)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync()
      console.log(status)
      if (status == 'granted') {
        const location = await Location.getCurrentPositionAsync()
        setLocation(location)
        setReady(true)
      } else {
        Alert.alert('Localisation', 'Vous devez donner le droit de vous localiser.')
      }
    })()
  }, [])

  return (
    <React.Fragment>
      <StatusBar barStyle='light-content' />
      {
        ready && (
          <Run distance={200} location={location} />
        )
      }
      {
        !ready && (
          <View style={styles.container}>
            <ActivityIndicator size='large' color='white' />
          </View>
        )
      }
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29252b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
