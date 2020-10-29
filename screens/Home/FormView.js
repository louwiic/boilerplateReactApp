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
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-fontawesome-pro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../components/context';
import { TouchableHighlight } from 'react-native-gesture-handler';
 
const RegisterView = () => {
  const navigation = useNavigation();
  const [borderFocus, setBorderFocus] = React.useState('transparent');
  const [chosenDate, setChosenDate] = React.useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const {register, setValue, handleSubmit, errors} = useForm();
  const inputEl = React.useRef();

  React.useEffect(() => {
    register({name: 'text'}, {required: true});
    register({name: 'phone'}, {required: true});
    register({name: 'email'}, {required: true});
    register({name: 'password'}, {required: true});
    register({name: 'address'}, {required: true});
    register({name: 'zipcode'}, {required: true});
  }, [register]);


  const submit = (data) => {
    console.log(data);
    console.log("value data picker");
    console.log(chosenDate);
  }


  const HandleError = () => {
      return (
          <>
           <Text>Error</Text>
          </>
      )
  }


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    moment.locale('fr')
    var d = moment(date).format('LL');
    setChosenDate(d)
   //console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
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
          FORMULAIRE
        </Text>

        <Text style={styles.label}>Text</Text>
        <TextInput
          style={[styles.input, borderFocus]} 
          onChangeText={(text) => setValue('text', text, true)}
          maxLength={10}  //setting limit of input
        />
        {/*errors.text && <HandleError />*/}

        <Text style={styles.label}>Phone Number</Text> 
        <TextInput
          keyboardType={"phone-pad"}
          style={[styles.input, borderFocus]} 
          onChangeText={(text) => setValue('phone', text, true)}
          maxLength={10}  //setting limit of input
        />
        {errors.phone && Alert.alert("Champs(s) manquant(s) phone")}

        <Text style={styles.label}>Email *</Text>
        <TextInput
         keyboardType={"email-address"}
         style={[styles.input]}
         onChangeText={(text) => setValue('email', text)}
        />
        {errors.email && Alert.alert("Champs(s) manquant(s) email")}

        <Text style={styles.label}>Password *</Text>
        <TextInput
        secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setValue('password', text)}
        />

        <Text style={styles.label}>Birthday</Text>
        <Pressable onPress={showDatePicker} 
        style={{ backgroundColor: 'white',
            borderColor: null,
            height: 48,
            paddingLeft:10,
            justifyContent: "center",
            borderRadius: 4,
          }}>
          <Text>{chosenDate}</Text>
        </Pressable>

         <DateTimePickerModal
            headerTextIOS={"Date d'anniversaire"}
            confirmTextIOS={"Selectionner"}
            cancelTextIOS={"Fermer"}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        {/*errors.birthday && <HandleError />*/}
          
        <Text style={styles.label}>Adresse *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue('address', text)}
        />

        <Text style={styles.label}>Zipcode</Text> 
        <TextInput
          keyboardType={"number-pad"}
          style={[styles.input, borderFocus]} 
          onChangeText={(text) => setValue('zipcode', text, true)}
          maxLength={10}  //setting limit of input
        />
        {errors.phone && Alert.alert("Champs(s) manquant(s) phone")}

        <TouchableOpacity onPress={handleSubmit(submit)}>
          <Text
            style={styles.button}
            color="white"
            title="S'inscrire"
            
          >Valider</Text>
        </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>     
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
    textAlign: "center",
    padding: 10
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
