import React, {useState, useEffect, useContext, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import {
  loginReducer,
  initialLoginState,
  Alert,
} from '../../redux/features/auth/authentication';
import {useSelector, useDispatch} from 'react-redux';
import {useApi} from './useApi';
const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
  const loginState = useSelector((state) => state.loginReducer);
  const [fcmToken, setFcmToken] = React.useState(null);
  const {API} = useApi();
  const dispatch = useDispatch();

  /**
   * Display Message notif in pop up ! forground app
   */
  /*React.useEffect(() => {
    setTimeout(() => {
      requestUserPermission();
    }, 3000);

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);*/

  /**
   * FCM CONNECT
   **/

  /* Permission notification */
  /*const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      provisional: false,
      sound: true,
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      if (authStatus == 1) {
        //setSwitchState(true);
        getFcmToken();
      }
    }
  };*/

  /**
   * Get Token FireBase
   */
  /*const getFcmToken = async () => {
    const firebaseToken = await messaging().getToken();
    let os_type = '';
    if (firebaseToken) {
      console.log('Your Firebase Token is:', firebaseToken);
      setFcmToken(firebaseToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };*/

  return {
    signIn: async (credentials) => {
      let userToken = null;
      console.log('Credentials #####', credentials);
      userToken = credentials.message;
      if (userToken) {
        try {
          await AsyncStorage.setItem('userToken', userToken.token);
          await AsyncStorage.setItem('refreshToken', userToken.refresh_token);
          await AsyncStorage.setItem('user', JSON.stringify(userToken));
        } catch (e) {
          console.log(e);
        }

        API.initConfig();
        dispatch({
          type: 'LOGIN',
          refreshToken: userToken.refresh_token,
          token: userToken.token,
          user: JSON.stringify(userToken),
        });
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('user');
      } catch (e) {
        console.log(e);
      }
      API.initConfig();
      dispatch({type: 'LOGOUT'});
    },
    signUp: async (credentials) => {
      let userToken = null;
      userToken = credentials.message;

      if (userToken) {
        try {
          await AsyncStorage.setItem('userToken', userToken.token);
          await AsyncStorage.setItem('refreshToken', userToken.refresh_token);
          await AsyncStorage.setItem('user', JSON.stringify(userToken));
        } catch (e) {
          console.log(e);
        }
      }

      API.initConfig();

      setTimeout(() => {
        API.getInfoUser().then((response) => {
          if (response.data.success) {
            dispatch({
              type: 'LOGIN',
              refreshToken: userToken.refresh_token,
              token: userToken.token,
              user: JSON.stringify(response.data.message),
            });
          }
        });
      }, 500);
    },
    userConnected: {data: loginState.user, fcmToken: null},
  };
};
