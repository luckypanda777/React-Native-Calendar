import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import SetPhotoName from '../screens/SetPhotoName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); 
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });

    GoogleSignin.configure({
      webClientId: '996774138663-6fkr29thvppia0oofuq13g630mmo4kfb.apps.googleusercontent.com',
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = 'Login';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SetPhotoName" component={SetPhotoName} /> */}
    </Stack.Navigator>
  )
}

export default AuthStack