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
  KeyboardAvoidingView
} from 'react-native';

import Icon, { configureFontAwesomePro } from 'react-native-fontawesome-pro';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import gloabalStyles from '../global/gloabalStyles';
import { log } from 'react-native-reanimated';

const Form = ({ fields, callbackSubmitForm, containerStyle, submitBtn}) => {
  const { register, setValue, handleSubmit, errors } = useForm();
  const [focusedIndex, setFocusIndex] = React.useState(null)



  /*  const fields = [
     { name: "firstname", required: <Text>Error firstname</Text>, iconLeft: { name: "user", size: 20, color: 'gray', type: "light" } },
     { name: "lastname", required: <Text>Error firstname</Text> },
     { name: "address", required: <Text>Error firstname</Text>, iconRight: { name: "user", size: 20, color: 'gray', type: "light" }, type: 'email' },
     { name: "zipcode", required: <Text>Error zipcode</Text>, maxLenght: 4 },
   ]
  */

  React.useEffect(() => {

    fields.map(item => {
      console.log('Fields ###')
      console.log(item);

      let error = <View style={styles.containerErrorMsg}><Text style={styles.errorMsg}>{item.required}</Text></View>
      let errorEmail = <View style={styles.containerErrorMsg}><Text style={styles.errorMsg}>Adresse email incorrect</Text></View>

      let emailType = {}
      let itemMaxLength = {}
      if (item.itemMaxLength) {
        itemMaxLength = {
          message: <Text>ce champ ne doit pas contenir plus de {item.maxLenght} charactères</Text>,
          value: item.itemMaxLength

        }
      }
      if (item.type == "email") {
        emailType = {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: errorEmail
        }
      }

      register({ name: item.name }, { required: error, pattern: emailType, maxLength: itemMaxLength })
    })
    /* register({ name: 'firstname' }, { required: <Text>Error firstname</Text> });
    register({ name: 'lastname' }, { required: <Text>error lastname</Text> });
    register({ name: 'address' }, {
      required: <Text>Le champ email ne doit pas etre vide</Text>,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: <Text>Adresse email invalide</Text>
      }
    }); */
  }, [register]);

  const submit = (data) => {
    callbackSubmitForm(data)
  }

  const handleFocus = (index) => {
    setFocusIndex(index)

  }
  return (
    <View style={containerStyle}>
      <KeyboardAvoidingView style={{ flex:1, flexDirection: 'column', justifyContent: 'center', }} behavior={Platform.OS === 'ios' ? "padding" : null} enabled keyboardVerticalOffset={100}>
        {
          fields.map((item, index) => {
            let fieldName = item.name;
            let label = item.label;

            return (
              <View key={index}>
                <Text style={styles.label}> {label} {item.required ? "*" : ""} </Text>
                <View style={[styles.sectionStyle, { borderColor: focusedIndex === index ? gloabalStyles.main2 : gloabalStyles.gray }]}>
                  {item.iconLeft && <View style={{ marginLeft: 10 }}><Icon name={item.iconLeft.name} size={item.iconLeft.size} color={item.iconLeft.color} type={item.iconLeft.type} /></View>}
                  <TextInput
                    secureTextEntry={item.type === "password" ? true : false}
                    key={index}
                    onFocus={() => handleFocus(index)}
                    style={[styles.input]}
                    onChangeText={(text) => setValue(fieldName, text, true)}
                  />
                  {item.iconRight && <View style={{ marginLeft: 10 }}><Icon name={item.iconRight.name} size={item.iconRight.size} color={item.iconRight.color} type={item.iconRight.type} /></View>}
                  {focusedIndex === index && <TouchableOpacity style={{ marginRight: 10 }}><Icon name="times-circle" size={18} color={gloabalStyles.main2} type="regular" /></TouchableOpacity>}
                </View>
                {/*errors[fieldName] && <Text style={{ marginTop: 2, color: 'red' }}>Champ manquant {fieldName}</Text>*/}
                {errors[fieldName] && (errors[fieldName].message)}
                {item.customComponent && item.customComponent}

              </View>
            )
          })
        }
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleSubmit(submit)}>
            <Text style={styles.titleBtn}>{submitBtn ? submitBtn.title : "" } </Text>
            <View style={{position: "absolute", right: "7%", padding:10, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)'}}>
              <Icon name={"chevron-right"} size={18} color={"#FFFFFF"} type={"solid"} />
            </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    //justifyContent: 'center',
  },
  containerErrorMsg: { marginLeft: "0%"},
  errorMsg: {color: "#e53935", fontSize:10, marginTop:-5},
  label: {
    color: 'black',
    // margin: 8,
    marginLeft: 0,
    marginTop: 8,
    marginBottom: 8,
    fontSize: 12
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderWidth: 0.5,
    height: 52,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 52,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: gloabalStyles.main,
    height: 56,
    borderRadius: 5,
 
  },
  titleBtn: {
    color: 'white',
    fontWeight: "700",

  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10
    /* backgroundColor: '#F1F1F1',
    borderColor: null,
    height: 40,
    padding: 10,
    borderRadius: 4, */
  },
});

export default Form;
