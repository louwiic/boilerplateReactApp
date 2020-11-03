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
import FirstConnexionView from '../../app/screens/Auth/FirstConnexionView';
import ConfirmFirstConnexionView from '../../app/screens/Auth/ConfirmFirstConnexionView';

const Stack = createStackNavigator();

const AuthStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}}  name="LoginView">{() => <LoginView />}</Stack.Screen>
      <Stack.Screen options={{headerShown: false}} name="FirstConnexionView" component={FirstConnexionView} />
      <Stack.Screen options={{headerShown: false}} name="ConfirmFirstConnexionView" component={ConfirmFirstConnexionView} />
      <Stack.Screen name="RegisterView">{() => <RegisterView />}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;
