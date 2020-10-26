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
  DatePickerIOS,
} from 'react-native';

import Icon from 'react-native-fontawesome-pro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../components/context';

const RegisterView = () => {
  const navigation = useNavigation();
  const [borderFocus, setBorderFocus] = React.useState('transparent');
  const [chosenDate, setChosenDate] = React.useState(new Date());

  const {register, setValue, handleSubmit, errors} = useForm();
  const inputEl = React.useRef();

  React.useEffect(() => {
    register({name: 'lastname'}, {required: true});
    register({name: 'firstname'});
  }, [register]);

  const {signUp} = React.useContext(AuthContext);

  const focusedInput = () => {
    inputEl.current.setNativeProps({
      style: {
        borderColor: 'red',
        borderWidth: 1,
      },
    });
  };
  const focusedOut = () => {
    inputEl.current.setNativeProps({
      style: {
        borderColor: 'transparent',
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'times-circle'}
              color={'black'}
              type="light"
              size={24}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            margin: 25,
          }}>
          S'ENREGISTRER
        </Text>

        <Text style={styles.label}>Nom *</Text>
        <TextInput
          style={[styles.input, borderFocus]}
          onChangeText={(text) => setValue('lastname', text, true)}
        />
        {errors.lastname &&
          Alert.alert("Champs(s) manquant(s) Nom d'utilisateur")}

        <Text style={styles.label}>Prénom *</Text>
        <TextInput
          secureTextEntry={true}
          style={[styles.input]}
          onChangeText={(text) => setValue('firstname', text)}
        />

        <Text style={styles.label}>Date de naissance *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue('birthday', text)}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue('email', text)}
        />

        <Text style={styles.label}>Adresse *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue('address', text)}
        />

        <View style={styles.button}>
          <Button
            color="white"
            title="S'inscrire"
            onPress={handleSubmit(signUp)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
  },
  container: {
    flex: 1,
    marginTop: '20%',
    marginLeft: '4%',
    marginRight: '4%',
    //padding: 8,
  },
  button: {
    marginTop: 40,
    color: 'white',
    backgroundColor: '#ec5990',
    height: 40,
    borderRadius: 4,
  },
  input: {
    backgroundColor: 'white',
    borderColor: null,
    height: 48,
    padding: 10,
    borderRadius: 4,
  },
});

export default RegisterView;
