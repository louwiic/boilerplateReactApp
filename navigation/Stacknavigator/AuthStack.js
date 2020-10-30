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
import LoginView from '../../app/screens/Auth/LoginView';
import RegisterView from '../../app/screens/Auth/RegisterView';
import {AuthContext} from '../../app/components/context';

import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginView">{() => <LoginView />}</Stack.Screen>
      <Stack.Screen name="RegisterView">{() => <RegisterView />}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
