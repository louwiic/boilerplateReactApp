import React from 'react';
import {Avatar, Accessory} from 'react-native-elements';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import I18n from '../../utils/i18n';
import globalStyles from '../../global/globalStyles';
import Form from '../../components/Form';
import {useApi} from '../../services/apiconfig';
import moment from 'moment';
//import LottieLoading from '../../components/lottieLoading';

/* template item */
const InfoUserView = ({navigation, item, route}) => {
  //const {user} = route.params;
  //const {API} = useApi();

  const user = {};
  React.useEffect(() => {}, []);

  /* Form row */
  const fields = [
    {
      name: 'lastname',
      label: 'Nom et prénom',
      required: '',
      iconLeft: null,
      editable: true,
      value: user.name,
    },
    {
      name: 'date',
      label: "Date d'entrée dans le logement",
      required: '',
      iconLeft: null,
      editable: true,
      value: user.entry_date,
      type: 'date',
      //type: 'email',
    },
    {
      name: 'address',
      label: 'Adresse complète',
      editable: true,
      value: user.address,
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
          value: user.zipcode,
        },
        {
          name: 'city',
          label: 'Ville',
          editable: true,
          containerInputStyle: {backgroundColor: globalStyles.gray3},
          inputStyle: {backgroundColor: globalStyles.gray3},
          value: user.town,
        },
      ],
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
      <Form
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
      />
    </View>
  );
};

export default InfoUserView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 15,
    color: globalStyles.grayScale,
    lineHeight: 24,
  },
});
