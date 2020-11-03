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
  Image
} from 'react-native';
import I18n from '../../utils/ i18n';
import Icon, { configureFontAwesomePro } from 'react-native-fontawesome-pro';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/LoginView.js';
import { AuthContext } from '../../components/context';
import Form from '../../components/Form';


const LoginView = () => {

  const navigation = useNavigation();

  const { signIn } = React.useContext(AuthContext);

  const submitBtn = {title: "C'EST PARTIE !"}

  const firstConnectTitle = 
      <TouchableOpacity activeOpacity={0.3} style={{alignItems:"center", justifyContent:"center", marginTop:8}} onPress={() => navigation.navigate('FirstConnexionView')}>
        <Text style={{fontWeight: "300"}}>Premiére connexion ?</Text>
      </TouchableOpacity>

  const fields = [
    { name: "login", label: "Adresse email", required: "Adresse email obligatoire*", iconLeft: null, type: "email", setValue: 'loic@mail.com' },
    { name: "password", label: "Mot de passe", required: "Mot de passe obligatoire*", maxLength: 2, type: "password", customComponent: firstConnectTitle },
  ]

  const onSubmit = async (data) => {
    if (data.login && data.password) {
      try {
        await AsyncStorage.setItem('authToken', 'ldZdkd@d2!');
      } catch (e) {
        // saving error
      }

    }
  };

  const callbackSubmitForm = (data) => {
    signIn(data)
    console.log("In logiinView")
    console.log({data})
  }


  return (
    <View style={styles.container}>
      <Image
        style={{
          position: "absolute",
          alignSelf: 'center',
          top: "12%",
        }}
        source={require("../../assets/branding.png")}
      />

      <View style={{ position: "absolute",  top: "35%"}}>
      <Text style={{fontWeight: 'bold'}}>{I18n.t("titleLogin")}</Text>
        <Text style={{marginTop: 8 }}>{I18n.t("subtitleLogin")}</Text>
        <Form containerStyle={{marginTop: 32}} submitBtn={submitBtn} fields={fields} callbackSubmitForm={callbackSubmitForm} />        
      </View>
    </View>
  );
};

export default LoginView;
