import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from '../screens/Home'
import Messages from '../screens/Messages';
import Clients from '../screens/Clients';
import UserProfile from '../screens/Settings/UserProfile';

const Tab = createBottomTabNavigator();

function TabNav(){
  return (
    <Tab.Navigator
        initialRouteName='Appointments'
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {elevation: 0, borderTopWidth: 0, backgroundColor: '#201D1A'},
            tabBarIcon: ({ focused, iconColor, iconName }) => {
                if (route.name === 'Appointments'){
                    iconColor = focused ? '#78E79F' : 'white'
                    iconName = 'calendar-blank-outline'
                } else if (route.name === 'Messages'){
                    iconColor = focused ? '#78E79F' : 'white'
                    iconName = 'message-text-outline'
                } else if (route.name === 'Clients'){
                    iconColor = focused ? '#78E79F' : 'white'
                    iconName = 'book-open-blank-variant'
                } else {
                    iconColor = focused ? '#78E79F' : 'white'
                    iconName = 'card-account-details-outline'
                }
                return <Icon name={iconName} size={25} color={iconColor} />;
            },
            tabBarShowLabel: false,
        })}
    >
        <Tab.Screen name='Appointments' component={Home} />
        <Tab.Screen name='Messages' component={Messages} />
        <Tab.Screen name='Clients' component={Clients} />
        <Tab.Screen name='Profile' component={UserProfile} />
    </Tab.Navigator>
  )
}

export default TabNav