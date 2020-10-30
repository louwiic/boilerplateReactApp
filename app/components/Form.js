import 'react-native-gesture-handler';
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
} from 'react-native';

import Icon, {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

const HomeView = () => {
  const {register, setValue, handleSubmit, errors} = useForm();
  const onSubmit = (data) => Alert.alert('Form Data', JSON.stringify(data));

  React.useEffect(() => {
    register({name: 'firstName'}, {required: true});
    register({name: 'lastName'});
  }, [register]);

  return (
    <View style={styles.container}>
      <Text>Hello React ! 🎉</Text>

      <Text style={styles.label}>Nom d'utilisateur *</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue('firstName', text, true)}
      />
      {errors.firstName &&
        Alert.alert("Champs(s) manquant(s) Nom d'utilisateur")}

      <Text style={styles.label}>Mot de passe *</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue('lastName', text)}
      />

      <View style={styles.button}>
        <Button color="white" title="Button" onPress={handleSubmit(onSubmit)} />
      </View>
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
    justifyContent: 'center',
    paddingTop: 20,
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
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});

export default HomeView;
