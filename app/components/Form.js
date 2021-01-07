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
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon, {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {useForm, Controller} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../global/globalStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Pressable} from 'react-native';
import moment from 'moment';

const Form = ({
  fields,
  rowFields,
  containerStyle,
  ContainerTextInputStyle,
  TextInputStyle,
  buttonStyle,
  buttonTitle,
  iconRightBtn,
  callbackSubmitForm,
  headerForm,
  footerForm,
  scrollEnabled,
  submitSticky,
  textPickerDateStyle,
}) => {
  const [focusedIndex, setFocusIndex] = React.useState(null);
  const [focusedRowFieldIndex, setFocusRowFieldIndex] = React.useState(null);
  const [chosenDate, setChosenDate] = React.useState();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [displayPwd, setDisplayPwd] = React.useState(false);

  const [infoRegion, setInfoRegion] = React.useState({
    zipcode: '',
    city: '',
  });
  const [defaultData, setDefaultData] = React.useState({});
  const {
    register,
    setValue,
    reset,
    getValues,
    handleSubmit,
    watch,
    errors,
  } = useForm({
    defaultValues: defaultData,
  });

  /*   Example field 
    type = number | phone | email | date
    const fields = [
     { name: "firstname", required: <Text>Error firstname</Text>, iconLeft: { name: "user", size: 20, color: 'gray', type: "light" } },
     { name: "lastname", required: <Text>Error firstname</Text> },
     { name: "address", required: <Text>Error firstname</Text>, iconRight: { name: "user", size: 20, color: 'gray', type: "light" }, type: 'email' },
     { name: "zipcode", required: <Text>Error zipcode</Text>, maxLenght: 4 },
   ]
  */

  React.useEffect(() => {
    fields.map((item) => {
      if (item.value) {
        defaultData[item.name] = item.value;
      }

      if (item.name == 'date') {
        if (item.value) {
          setChosenDate(moment(item.value).format('Do MMMM YYYY'));
        }
      }

      if (item.rowFields) {
        setInfoRegion({
          zipcode: item.rowFields[0].value,
          city: item.rowFields[1].value,
        });
      }

      let error = (
        <View style={styles.containerErrorMsg}>
          <Text style={{color: '#e53935', fontSize: 11}}>{item.required}</Text>
        </View>
      );
      let errorEmail = (
        <View style={styles.containerErrorMsg}>
          <Text style={{color: '#e53935', fontSize: 11}}>
            Adresse email incorrect
          </Text>
        </View>
      );

      let emailType = {};
      let itemMaxLength = {};
      if (item.itemMaxLength) {
        itemMaxLength = {
          message: (
            <Text>
              ce champ ne doit pas contenir plus de {item.maxLenght} charactères
            </Text>
          ),
          value: item.itemMaxLength,
        };
      }
      if (item.type == 'email') {
        emailType = {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: errorEmail,
        };
      }

      register(
        {name: item.name},
        {
          required: item.required ? error : false,
          pattern: emailType,
          maxLength: itemMaxLength,
        },
      );
    });
  }, [register, reset, defaultData]);

  const submit = (data) => {
    if (chosenDate !== '') {
      data['date'] = chosenDate;
    }
    if (infoRegion.city !== '' && infoRegion.zipcode !== '') {
      data['infoRegion'] = infoRegion;
    }
    callbackSubmitForm(data);
  };

  const handleFocus = (index) => {
    setFocusRowFieldIndex(null);
    setFocusIndex(index);
    setDisplayPwd(false);
  };

  const handleFocusRowField = (index) => {
    setFocusIndex(null);
    setFocusRowFieldIndex(index);
    setDisplayPwd(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    var d = moment(date).format('LL');
    setChosenDate(d);
    //console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const handleRegion = (field, text) => {
    setInfoRegion({...infoRegion, [field]: text});
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <KeyboardAwareScrollView
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}>
        {headerForm && headerForm}

        {fields.map((item, index) => {
          let fieldName = item.name;
          /*  if(item.value){
            setValue(fieldName, item.value, true)
          }  */
          return (
            <View key={fieldName}>
              <Text style={styles.label}>
                {item.name !== 'rowField' && item.label}
                {item.required ? '*' : ''}
              </Text>

              {item.type == 'date' ? (
                <View
                  style={[
                    styles.sectionStyle,
                    ContainerTextInputStyle,
                    {display: item.name == 'rowField' ? 'none' : 'flex'},
                    {
                      borderColor:
                        focusedIndex === index
                          ? globalStyles.main2
                          : globalStyles.gray,
                    },
                  ]}>
                  <Pressable
                    press
                    onPress={item.editable ? showDatePicker : null}
                    style={[
                      styles.input,
                      TextInputStyle,
                      {display: item.name == 'rowField' ? 'none' : 'flex'},
                    ]}>
                    <Text style={textPickerDateStyle}>
                      {moment(item.value).format('LL')}
                    </Text>
                  </Pressable>
                  <DateTimePickerModal
                    headerTextIOS={"Date d'anniversaire"}
                    confirmTextIOS={'Selectionner'}
                    cancelTextIOS={'Fermer'}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
              ) : (
                <View
                  style={[
                    styles.sectionStyle,
                    ContainerTextInputStyle,
                    {display: item.name == 'rowField' ? 'none' : 'flex'},
                    {
                      borderColor:
                        focusedIndex === index
                          ? globalStyles.main2
                          : globalStyles.gray,
                    },
                  ]}>
                  {item.iconLeft && (
                    <View style={{marginLeft: 10}}>
                      <Icon
                        name={item.iconLeft.name}
                        size={item.iconLeft.size}
                        color={item.iconLeft.color}
                        type={item.iconLeft.type}
                      />
                    </View>
                  )}
                  <View
                    style={[
                      {
                        paddingRight:
                          item.type === 'password' ? '17%' : undefined,
                        width: '95%',
                      },
                    ]}>
                    <TextInput
                      placeholder={item.placeholder}
                      autoCapitalize={item.type == 'email' ? 'none' : null}
                      clearButtonMode={'always'}
                      defaultValue={item.value}
                      keyboardType={
                        item.type == 'phone'
                          ? 'phone-pad'
                          : item.type == 'email'
                          ? 'email-address'
                          : item.type == 'number'
                          ? 'number-pad'
                          : null
                      }
                      editable={item.editable}
                      secureTextEntry={
                        item.type === 'password'
                          ? displayPwd && focusedIndex === index
                            ? false
                            : true
                          : false
                      }
                      key={index}
                      onFocus={() => handleFocus(index)}
                      style={[
                        styles.input,
                        TextInputStyle,
                        {
                          display: item.name == 'rowField' ? 'none' : 'flex',
                        },
                      ]}
                      onChangeText={(text) => {
                        setValue(fieldName, text, true);
                      }}
                    />
                  </View>
                  {item.type == 'password' && focusedIndex === index && (
                    <View
                      style={{
                        position: 'absolute',
                        right: '5%',
                        width: 40,
                        height: 40,
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => setDisplayPwd(!displayPwd)}
                        activeOpacity={0.8}
                        style={{marginLeft: 10}}>
                        <Icon
                          name={displayPwd ? 'eye-slash' : 'eye'}
                          size={16}
                          color={'black'}
                          type="light"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  {/* item.iconRight && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => console.log('iconRight')}
                      style={{marginLeft: 10}}>
                      <Icon
                        name={item.iconRight.name}
                        size={item.iconRight.size}
                        color={item.iconRight.color}
                        type={item.iconRight.type}
                      />
                    </TouchableOpacity>
                  ) */}
                  {/* {focusedIndex === index && (
                    <TouchableOpacity
                      ctiveOpacity={0.8}
                      onPress={() => {
                        reset({
                          firstname: 'test',
                        });
                      }}
                      style={{marginRight: 35}}>
                      <Icon
                        name="times-circle"
                        size={12}
                        color={globalStyles.grayScale}
                        type="regular"
                      />
                    </TouchableOpacity>
                  )} */}
                </View>
              )}

              {/* ROW FIELDS */}
              {item.rowFields && (
                <View
                  style={[
                    {
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginBottom: 40,
                      marginTop: -30,
                    },
                  ]}>
                  {item.rowFields.map((item, i) => {
                    let fieldNameRow = item.name;

                    return (
                      <View style={[{height: 48, width: '48%'}]}>
                        <Text style={styles.label}>{item.label}</Text>
                        <View
                          key={i}
                          style={[
                            styles.sectionStyle,
                            item.containerInputStyle,
                            {
                              borderColor:
                                focusedRowFieldIndex === i
                                  ? globalStyles.main2
                                  : globalStyles.gray,
                            },
                          ]}>
                          <TextInput
                            editable={item.editable}
                            //returnKeyType={"next"}
                            secureTextEntry={
                              item.type === 'password' ? true : false
                            }
                            keyboardType={
                              item.name == 'zipcode' ? 'number-pad' : null
                            }
                            key={i}
                            onFocus={() => handleFocusRowField(i)}
                            style={[styles.input]}
                            defaultValue={item.value}
                            onChangeText={(text) =>
                              handleRegion(item.name, text)
                            }
                          />
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
              {/*errors[fieldName] && <Text style={{ marginTop: 2, color: 'red' }}>Champ manquant {fieldName}</Text>*/}
              {errors[fieldName] && errors[fieldName].message}
              {item.customComponent && item.customComponent}
            </View>
          );
        })}
        {!submitSticky && (
          <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={handleSubmit(submit)}>
            <Text style={styles.titleBtn}>{buttonTitle}</Text>
            {iconRightBtn && (
              <View
                style={{
                  position: 'absolute',
                  right: '7%',
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                }}>
                <Icon
                  name={iconRightBtn.name}
                  size={String(iconRightBtn.size)}
                  color={iconRightBtn.color}
                  type={iconRightBtn.type}
                />
              </View>
            )}
          </TouchableOpacity>
        )}

        {footerForm && footerForm}
      </KeyboardAwareScrollView>
      {submitSticky && (
        <View style={[styles.footer, {width: '100%'}]}>
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            activeOpacity={0.9}
            style={[styles.button, buttonStyle]}>
            <Text style={styles.titleBtn}>{buttonTitle}</Text>
            <View
              style={{
                position: 'absolute',
                right: '7%',
                padding: 10,
                borderRadius: 20,
                backgroundColor: 'rgba(255,255,255,0.2)',
              }}>
              <Icon
                name={'chevron-right'}
                size={12}
                color={'#FFFFFF'}
                type={'solid'}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerErrorMsg: {marginLeft: '0%'},
  label: {
    color: globalStyles.grayScale,
    // margin: 8,
    marginLeft: 0,
    marginTop: 20,
    marginBottom: 8,
    fontSize: 12,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderWidth: 0.5,
    height: 52,
    borderRadius: 8,
  },
  button: {
    marginTop: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyles.main,
    height: 56,
    borderRadius: 5,
  },
  titleBtn: {
    color: 'white',
    fontWeight: '700',
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    /*  borderColor: 'pink',
    borderWidth: 1, */
  },
  footer: {
    //backgroundColor: globalStyles.main,
    position: 'absolute',
    bottom: 48,
    height: 56,
    width: 279,
    alignSelf: 'center',
  },
});

export default Form;
