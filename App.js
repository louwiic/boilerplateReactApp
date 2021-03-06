/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import localization from 'moment/locale/fr';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './redux/reducers.js';
import Icon, { configureFontAwesomePro } from 'react-native-fontawesome-pro';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
//stack
import HomeStack from './navigation/Stacknavigator/HomeStack';
import AuthStack from './navigation/Stacknavigator/AuthStack';
import ProfilStack from './navigation/Stacknavigator/ProfilStack';
//View
import LoginView from './app/screens/Auth/LoginView';
import FormView from './app/screens/Home/FormView';
import Form from './app/components/Form';
//lib
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './app/components/context';
//Nav
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { loginReducer, initialLoginState } from './redux/features/auth/authentication';
import TutorialApp from './app/components/tutorialApp.js';

/* Init config */
configureFontAwesomePro(); //Fontawsome
const Tab = createBottomTabNavigator(); //BottomTab
const store = createStore(allReducers); //store redux


const App = () => {

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const [displayTutorial, setDisplayTutorial] = React.useState({ firstLaunched: "true" })
  const authContext = React.useMemo(() => ({
    signIn: async (credentials) => {
      let userToken = null;
      if (credentials.login && credentials.password) {
        userToken = 'kdj@d!';
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
      }
      dispatch({ type: 'LOGIN', id: credentials.login, token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: async (credentials) => {
      let userToken = null;
      if (credentials) {
        userToken = 'kdj@d!';
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
      }
      dispatch({ type: 'LOGIN', id: credentials.login, token: userToken });
    },
  }));

  React.useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false); 
      let userToken = null;
      let firstLaunchKey = null;
      try {
        //await AsyncStorage.setItem('firstLaunchKey', "true")
        userToken = await AsyncStorage.getItem('userToken');
        firstLaunchKey = await AsyncStorage.getItem('firstLaunchKey');

      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      setDisplayTutorial({ firstLaunched: String(firstLaunchKey) })
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);


  const onLoadTutorial = async (state) => {
    setDisplayTutorial({ firstLaunched: state });
    await AsyncStorage.setItem('firstLaunchKey', state);

  }

  if (loginState.isLoading) {
    return (
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        {
          displayTutorial.firstLaunched == "true" ? <TutorialApp onLoadTutorial={onLoadTutorial} /> :
            <NavigationContainer>
              {loginState.userToken !== null ? (
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                      } else if (route.name === 'Form') {
                        iconName = focused ? 'file-contract' : 'file-contract';
                      } else if (route.name === 'Profil') {
                        iconName = focused ? 'user-circle' : 'user-circle';
                      }
                      return (
                        <Icon
                          name={iconName}
                          color={color}
                          type="light"
                          size={size}
                        />
                      );
                    },
                  })}
                  tabBarOptions={{
                    activeTintColor: global.headerColor,
                    inactiveTintColor: 'gray',
                  }}>
                  <Tab.Screen name="Home" component={HomeStack} />
                  <Tab.Screen name="Form" component={FormView} />
                  <Tab.Screen name="Profil" component={ProfilStack} />
                </Tab.Navigator>
              ) : (
                  <AuthStack />
                )}
            </NavigationContainer>
        }
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
