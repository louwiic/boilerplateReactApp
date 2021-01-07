import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Icon, {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import styles from '../../styles/LoginView.js';
import {AuthContext} from '../../components/context';
import {useAuth} from '../../hook/useAuth.js';
import Form from '../../components/Form.js';
import I18n from '../../utils/i18n';

const LoginView = () => {
  const navigation = useNavigation();

  const {register, setValue, handleSubmit, errors} = useForm();

  React.useEffect(() => {
    register({name: 'login'}, {required: true});
    register({name: 'password'});
  }, [register]);

  const {signIn} = useAuth();

  const callbackSubmitForm = (obj) => {
    obj = {
      message: true,
      token: 'ldZdkd@d2!',
      refresh_token: 'ldZdkd@d2!ldkfld/*',
    };
    signIn(obj);
  };

  const fields = [
    {
      name: 'email',
      label: 'Adresse email',
      required: 'Adresse email obligatoire*',
      type: 'email',
      //value: 'jpshandranie22@gmail.com',
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'password',
      //value: '123456',
      required: 'Mot de passe obligatoire*',
      maxLength: 6,
      type: 'password',
      //customComponent: firstConnectTitle,
    },
  ];

  const Header = () => {
    return (
      <View style={{marginTop: '20%'}}>
        <Text style={styles.title}>{I18n.t('titleLogin')}</Text>
        <Text style={styles.subtitle}>{I18n.t('subtitleLogin')}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          margin: 40,
        }}>
        CONNEXION
      </Text>

      <Form
        buttonStyle={styles.button}
        iconRightBtn={{
          name: 'chevron-right',
          size: '12',
          color: '#FFFFFF',
          type: 'solid',
        }}
        headerForm={<Header />}
        //footerForm={<Footer />}
        scrollEnabled={true}
        containerStyle={{
          marginBottom: 32,
          marginLeft: '4%',
          marginRight: '4%',
        }}
        ContainerTextInputStyle={{backgroundColor: 'white'}}
        TextInputStyle={{backgroundColor: 'white'}}
        buttonTitle={I18n.t('connectTitle')}
        fields={fields}
        callbackSubmitForm={callbackSubmitForm}
      />
    </View>
  );
};

export default LoginView;
