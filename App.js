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

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './redux/reducers.js';
import Icon, {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
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
import {AuthContext} from './app/components/context';
//Nav
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {
  loginReducer,
  initialLoginState,
} from './redux/features/auth/authentication';
import {ProvideAuth} from './app/hook/useAuth.js';
import {useSelector, useDispatch} from 'react-redux';

/* Init config */
configureFontAwesomePro(); //Fontawsome
const Tab = createBottomTabNavigator(); //BottomTab
const store = createStore(allReducers); //store redux

const App = () => {
  const loginState = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

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

  function getTabBarVisible(route) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'Home';

    if (routeName === 'camera') {
      return false;
    }
    return true;
  }

  return (
    <ProvideAuth>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
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
            <Tab.Screen
              name="Profil"
              options={({route}) => ({
                tabBarVisible: getTabBarVisible(route),
              })}
              component={ProfilStack}
            />
          </Tab.Navigator>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </ProvideAuth>
  );
};

export default App;
