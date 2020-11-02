import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Icon, {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeView from '../../app/screens/Home/HomeView';
import DetailView from '../../app/screens/Home/DetailView';

import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      {/* Customize your app bar with options (check docs react navigation about) */}
      <Stack.Screen 
        options={{
          title: 'HOME',
          headerStyle: {
            backgroundColor: "#ff5722",
          },
          headerTintColor: '#f0f0f0',
          headerBackTitle: 'retour',
          headerTitleStyle: {
            textAlign: 'center',
            fontWeight: '600',
            alignSelf: 'center',
            fontFamily: global.fontIBMPRegular,
            letterSpacing: -0.08,
          },
        }} 
        name="Home"component={HomeView} />

      <Stack.Screen  
          options={{
          title: 'DETAILS',
          headerStyle: {
            backgroundColor: "#ff5722",
          },
          headerTintColor: '#f0f0f0',
          headerBackTitle: 'retour',
          headerTitleStyle: {
            textAlign: 'center',
            fontWeight: '600',
            alignSelf: 'center',
            fontFamily: global.fontIBMPRegular,
            letterSpacing: -0.08,
          },
        }}
        name="Detail" component={DetailView} />
    </Stack.Navigator>
  );
};

export default HomeStack;
