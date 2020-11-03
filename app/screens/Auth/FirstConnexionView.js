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

const FirstConnexionView = () => {
  const navigation = useNavigation();

  const { register, setValue, handleSubmit, errors } = useForm();

  React.useEffect(() => {
    register({ name: 'login' }, { required: true });
    register({ name: 'password' });
  }, [register]);

  const { signIn } = React.useContext(AuthContext);

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
    console.log("In logiinView")
    console.log(data)
  }

  const openFisrtConnect = () => {
    console.log("first connexion");
  }

  const firstConnectTitle = 
      <TouchableOpacity style={{alignItems:"center", justifyContent:"center", marginTop:8}} onPress={openFisrtConnect}>
        <Text style={{fontWeight: "300"}}>Premiére connexion ?</Text>
      </TouchableOpacity>


  const fields = [
    { name: "Adresse email", required: "Adresse email obligatoire*", iconLeft: null, type: "email", setValue: 'loic@mail.com' },
    { name: "Mot de passe", required: "Mot de passe obligatoire*", maxLength: 2, type: "password", customComponent: firstConnectTitle },
  ]

  const submitBtn = {title: "C'EST PARTIE !", containerStyle: {}}
  return (
    <View style={styles.container}>
      <Image
        style={{
          position: "absolute",
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: 'bold',
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

export default FirstConnexionView;
