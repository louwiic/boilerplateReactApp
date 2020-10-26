/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './redux/reducers.js';
import Icon, {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './navigation/Stacknavigator/HomeStack';
import AuthStack from './navigation/Stacknavigator/AuthStack';
import LoginView from './screens/Auth/LoginView';
import Form from './components/Form';
import {AuthContext} from './components/context';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

/* Init config */
configureFontAwesomePro(); //Fontawsome
const Tab = createBottomTabNavigator(); //BottomTab
const store = createStore(allReducers); //store redux
const RootStack = createStackNavigator(); //RootStack

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

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
      dispatch({type: 'LOGIN', id: credentials.login, token: userToken});
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
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
      dispatch({type: 'LOGIN', id: credentials.login, token: userToken});
    },
  }));

  React.useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home';
                  } else if (route.name === 'List') {
                    iconName = focused ? 'clipboard-list' : 'clipboard-list';
                  } else if (route.name === 'Réglages') {
                    iconName = focused ? 'cog' : 'cog';
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
              <Tab.Screen name="Form" component={AuthStack} />
            </Tab.Navigator>
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
