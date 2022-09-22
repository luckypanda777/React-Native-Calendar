import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import { AuthContext } from '../auth/AuthProvider';
import TabNav from './TabNav';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  
  const onAuthStateChanged = (user) => { 
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? <TabNav /> : <AuthStack />}
    </NavigationContainer>
  );
}