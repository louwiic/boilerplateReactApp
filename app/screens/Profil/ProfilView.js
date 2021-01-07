import 'react-native-gesture-handler';
import React from 'react';
import {Avatar, Accessory, ListItem} from 'react-native-elements';
import Icon from 'react-native-fontawesome-pro';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {BottomSheetAction} from '../../components/bottomSheet';
import {AuthContext} from '../../components/context';
import Form from '../../components/Form';
import {useAuth} from '../../hook/useAuth';

const ProfilView = ({route, navigation}) => {
  const {signOut} = useAuth();
  const [takePicture, setTakePicture] = React.useState(false);
  const imageUri = route.params
    ? route.params.path
    : 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';

  /* Callback press in bottomsheet */
  const openDialog1 = (item) => {
    signOut();
    console.log('callback is called !!!');
  };
  const openDialog2 = (item) => {
    console.log('callback CVG is called !!');
  };
  const openDialog3 = (item) => {
    console.log('callback Feedback is called !!!');
  };

  /* Bottom sheet options */
  const bottomSheetOptions = [
    {
      title: 'Deconnexion',
      callback: openDialog1,
    },
    {
      title: 'CVG',
      callback: openDialog2,
    },
    {
      title: 'Feedback',
      callback: openDialog3,
    },
  ];

  const list = [
    {
      name: 'Mes infos',
      // avatar_url: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', //with avatar example just pass this property
      subtitle: 'Identifiants et adresses',
      iconProperties: (
        <Icon name="user-ninja" size={26} color={'gray'} type="light" />
      ),
      pressAction: (item) => console.log(item),
    },
    {
      name: 'Mes préférences',
      subtitle: 'Contact et notifications',
      iconProperties: <Icon name="cog" size={26} color={'gray'} type="light" />,
      pressAction: (item) => console.log(item),
    },
    {
      name: 'Aide et contact',
      subtitle: 'Questions et remarques',
      iconProperties: (
        <Icon name="info" size={26} color={'gray'} type="light" />
      ),
      pressAction: (item) => BottomSheetAction(bottomSheetOptions),
    },
  ];

  const callbackSubmitForm = (data) => {
    if (data) {
      console.log('Value firstname ####');
      console.log(data);
    } else {
      //load current data in form
    }
  };

  /* Form row */
  const fields = [
    {
      name: 'lastname',
      label: 'Nom et prénom',
      required: '',
      iconLeft: null,
      editable: true,
      value: '',
    },
    {
      name: 'date',
      label: "Date d'entrée dans le logement",
      required: '',
      iconLeft: null,
      editable: true,
      value: '',
      type: 'date',
      //type: 'email',
    },
    {
      name: 'address',
      label: 'Adresse complète',
      editable: true,
      value: '',
    },
    {
      name: 'rowField',
      rowFields: [
        {
          name: 'zipcode',
          label: 'Code postal',
          editable: true,
          containerInputStyle: {backgroundColor: globalStyles.gray3},
          inputStyle: {backgroundColor: globalStyles.gray3},
          value: '',
        },
        {
          name: 'city',
          label: 'Ville',
          editable: true,
          containerInputStyle: {backgroundColor: globalStyles.gray3},
          inputStyle: {backgroundColor: globalStyles.gray3},
          value: '',
        },
      ],
    },
  ];

  /* Show doc react-element customize list item https://reactnativeelements.com/docs/listitem#badges */
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => item.pressAction(item)}>
      <ListItem containerStyle={{backgroundColor: 'transparent'}} bottomDivider>
        {item.iconProperties && item.iconProperties}
        <Avatar
          rounded
          size={40}
          source={item.avatar_url && {uri: item.avatar_url}}
        />
        <ListItem.Content>
          <ListItem.Title style={{fontWeight: 'bold'}}>
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="angle-right" size={25} color={'gray'} type="light" />
      </ListItem>
    </TouchableOpacity>
  );

  const headerForm = (
    <View style={{flexmarginTop: 32, marginBottom: 32}}>
      {/*  <Text style={styles.title}>{I18n.t('userInfoTitle')}</Text> */}
    </View>
  );

  const Footer = () => {
    return <View style={{height: 48}} />;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#f5f5f5',
          paddingTop: 20,
          paddingBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Avatar
          rounded
          size={120}
          source={{
            uri: imageUri,
          }}
        />
        <View style={{width: Dimensions.get('window').width}}>
          {/* tools button */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <TouchableOpacity style={{padding: 15}}>
              <Icon name="piggy-bank" size={30} color="#000" type="light" />
            </TouchableOpacity>

            {/* Source customize gradient differents cases : https://blog.logrocket.com/understanding-react-native-linear-gradient/ */}
            {/* <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{x: 1, y: 1 }}
                  colors={[ '#833ab4', '#fd221d', '#fcb045' ]}
                  style={{                    
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    borderWidth:3, 
                    borderColor: "transparent"
                  }}
                > */}
            <TouchableOpacity
              onPress={() => navigation.navigate('camera')}
              style={{
                margin: 1,
                width: 50,
                borderColor: '#000',
                borderRadius: 15,
                borderWidth: 3,
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
              }}>
              <Icon
                name={'camera-retro'}
                color={'#000'}
                type="regular"
                size={24}
              />
            </TouchableOpacity>
            {/* </LinearGradient> */}

            <TouchableOpacity style={{padding: 15}}>
              <Icon
                name="plane-departure"
                size={30}
                color="#000"
                type="light"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{flex: 2}}>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={list}
          renderItem={renderItem}
        />
        {/* <Form
          buttonStyle={{display: 'none'}}
          ContainerTextInputStyle={{backgroundColor: globalStyles.gray3}}
          TextInputStyle={{
            backgroundColor: globalStyles.gray3,
            color: globalStyles.title,
            fontWeight: '600',
          }}
          textPickerDateStyle={{
            backgroundColor: globalStyles.gray3,
            color: globalStyles.title,
            fontWeight: '600',
          }}
          headerForm={headerForm}
          footerForm={<Footer />}
          containerStyle={{marginHorizontal: '4%'}}
          fields={fields}
          callbackSubmitForm={callbackSubmitForm}
        /> */}

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
    backgroundColor: 'white',
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

export default ProfilView;
