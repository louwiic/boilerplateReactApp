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
import ProfilView from '../../app/screens/Profil/ProfilView';
import {AuthContext} from '../../app/components/context';
import CameraView from '../../app/screens/Profil/Camera';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import TutorialView from '../../app/components/tutorialApp';

const Stack = createStackNavigator();

const AuthStack = ({navigation}) => {
  return (
    <Stack.Navigator >
      <Stack.Screen     
      options={{
          title: 'PROFIL',
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
         name="ProfilView" component={ProfilView} />

      <Stack.Screen  name="tutorial" component={TutorialView} />
      <Stack.Screen options={{headerShown: false}} name="camera" component={CameraView} />
    </Stack.Navigator>
  );
};

  export default AuthStack;
