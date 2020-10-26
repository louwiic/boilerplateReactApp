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

const LoginView = () => {
  const navigation = useNavigation();

  const {register, setValue, handleSubmit, errors} = useForm();

  React.useEffect(() => {
    register({name: 'login'}, {required: true});
    register({name: 'password'});
  }, [register]);

  const {signIn} = React.useContext(AuthContext);

  const onSubmit = async (data) => {
    if (data.login && data.password) {
      try {
        await AsyncStorage.setItem('authToken', 'ldZdkd@d2!');
      } catch (e) {
        // saving error
      }
    }
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

      <Text style={styles.label}>Nom d'utilisateur *</Text>
      <TextInput
        clearButtonMode="always"
        style={styles.input}
        onChangeText={(text) => setValue('login', text, true)}
      />
      {errors.login && Alert.alert("Champs(s) manquant(s) Nom d'utilisateur")}

      <Text style={styles.label}>Mot de passe *</Text>
      <TextInput
        clearButtonMode="always"
        selectionColor={'orange'}
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(text) => setValue('password', text)}
      />
      <TouchableOpacity onPress={() => navigation.navigate('RegisterView')}>
        <Text style={styles.register}>Créer un compte</Text>
      </TouchableOpacity>
      <View style={styles.button}>
        <Button
          color="white"
          title="Se connecter"
          onPress={handleSubmit(signIn)}
        />
      </View>
    </View>
  );
};

export default LoginView;
