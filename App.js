import React, { useEffect} from 'react';
import { PermissionsAndroid } from 'react-native';
import Providers from './src/navigation';

const App = () => {

  const androidPermissions = async () => {
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 
            'Travel needs access to your location ' +
            'so you can find the nearest courier.',
          buttonNeutral: 'Remind Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
      androidPermissions();
  }, [])

  return (
    <Providers />
  )
}

export default App