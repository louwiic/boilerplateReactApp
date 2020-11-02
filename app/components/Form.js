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

const HomeView = () => {
  const { register, setValue, handleSubmit, errors } = useForm();
  const [focusedIndex, setFocusIndex] = React.useState(null)



  const fields = [
    { name: "firstname", required: <Text>Error firstname</Text>, iconLeft:{ name:"user", size:20, color:'gray', type:"light"}  },
    { name: "lastname", required: <Text>Error firstname</Text> },
    { name: "address", required: <Text>Error firstname</Text>, iconRight :{ name:"user", size:20, color:'gray', type:"light"} ,type: 'email' },
    { name: "zipcode", required: <Text>Error zipcode</Text>, maxLenght: 4 },
  ]


  React.useEffect(() => {

    fields.map(item => {
      console.log('Fields ###')
      console.log(item);

      let emailType = {}
      let itemMaxLength = {}
      if(item.maxLenght){
        itemMaxLength = {
          message: <Text>ce champ ne doit pas contenir plus de {item.maxLenght} charactères</Text>,
          value: item.maxLenght

        }
      }
      if (item.type == "email") {
        emailType = {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: <Text>Adresse email invalide</Text>
        }
      }

      register({ name: item.name }, { required: item.required, pattern: emailType, maxLength: itemMaxLength })
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
    console.log(data)

  }

  const handleFocus = (index) => {
    setFocusIndex(index)

  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior={Platform.OS === 'ios' ? "padding" : null} enabled keyboardVerticalOffset={100}>

        <ScrollView>
          {
            fields.map((item, index) => {
              let fieldName = item.name;
              return (
                <>    
                    <Text style={styles.label}> {fieldName} *</Text>
                    <View style={[styles.sectionStyle, { borderWidth: 1, borderColor: focusedIndex === index ? 'orange' : "transparent" }]}>
                      {item.iconLeft && <View style={{marginLeft:10}}><Icon name={item.iconLeft.name} size={item.iconLeft.size} color={item.iconLeft.color} type={item.iconLeft.type} /></View>}                      
                      <TextInput
                        key={index}
                        onFocus={() => handleFocus(index)}
                        style={[styles.input]}
                        onChangeText={(text) => setValue(fieldName, text, true)}
                      />
                      {item.iconRight && <View style={{marginLeft:10}}><Icon name={item.iconRight.name} size={item.iconRight.size} color={item.iconRight.color} type={item.iconRight.type} /></View>}                      
                      {focusedIndex === index && <View style={{marginRight:10}}><Icon name="times-circle" size={18} color={'gray'} type="regular" /></View>}
                    </View>
                    {/*errors[fieldName] && <Text style={{ marginTop: 2, color: 'red' }}>Champ manquant {fieldName}</Text>*/}
                    {errors[fieldName] && (errors[fieldName].message)}
                    {item.customComponent && item.customComponent}
                
                </>
              )
            })
          }
          <TouchableOpacity onPress={handleSubmit(submit)}>
            <Text
              style={styles.button}
              color="white"
              title="S'inscrire"
            >
              Valider</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    marginLeft: '4%',
    marginRight: '4%',
    //padding: 8,
  },
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  button: {
    marginTop: 40,
    color: 'white',
    backgroundColor: '#ec5990',
    height: 40,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    /* backgroundColor: '#F1F1F1',
    borderColor: null,
    height: 40,
    padding: 10,
    borderRadius: 4, */
  },
});

export default HomeView;
