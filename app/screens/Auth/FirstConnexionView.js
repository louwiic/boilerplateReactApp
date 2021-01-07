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
import styles from '../../styles/LoginView.js';
import { AuthContext } from '../../components/context';
import Form from '../../components/Form';

const FirstConnexionView = ({navigation}) => {

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

    navigation.navigate('ConfirmFirstConnexionView', {dataForm: data})
  }

  const submitBtn = {
      title: "SUIVANT"
  }

  const fields = [
    { name:"email", label: "Adresse email", required: "Adresse email obligatoire*", iconLeft: null, type: "email", setValue: 'loic@mail.com' },
    { name:"identifiant", label: "Identifiant client", required: "Identifiant client obligatoire*", iconLeft: null },
    { name:"password", label: "Mot de passe temporaire", required: "Mot de passe obligatoire*", maxLength: 2, type: "password" },
  ]

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
   
        <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()} style={{
            //position: "absolute",
            alignSelf: "flex-start",
            fontSize: 24,
            fontWeight: 'bold',
            top: "5%",
            }}> 
            <Icon name={"chevron-left"} size={18} color={"black"} type={"solid"} /> 
        </TouchableOpacity>
        
        <Image
            style={{
            //position: "absolute",
            alignSelf: 'center',
            marginTop: "14%",
            }}
            source={require("../../assets/branding.png")}
        />

        <View style={{ /* position: "absolute", */  marginTop: "30%"}}>
        <Text style={{fontWeight: 'bold'}}>{I18n.t("firstCnxTitle")}</Text>
            <Text style={{marginTop: 8 }}>{I18n.t("firstCnxSubtitle")}</Text>
            <Form containerStyle={{marginTop: 32, marginBottom: 32}} submitBtn={submitBtn} fields={fields} callbackSubmitForm={callbackSubmitForm} />        
        </View>
 
    </ScrollView>
  );
};

export default FirstConnexionView;
