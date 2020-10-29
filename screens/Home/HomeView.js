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
  SectionList
} from 'react-native';

import Icon, {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {AuthContext} from '../../components/context';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import List from '../../components/flatlist';
import ItemSectionHomeList from '../../components/List/item/itemSectionHomeList';
import headerSectionHomeList from '../../components/List/item/headerSectionHomeList';
import SearchInList from '../../components/List/searchInList';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const HomeView = ({navigation}) => {

  const data = useSelector((state) => state.dataHomeList);
  const dispatch = useDispatch();

  const {register, setValue, handleSubmit, errors} = useForm();
  const onSubmit = (data) => Alert.alert('Form Data', JSON.stringify(data));

  React.useEffect(() => {
    register({name: 'firstName'}, {required: true});
    register({name: 'lastName'});
  }, [register]);

  React.useEffect(() => {
    //fetch data here

    dispatch({type: 'LOAD', data: DATA});
  }, []);

  const {signOut} = React.useContext(AuthContext);

  const paginate = () => {
    //
  }

  const handleRefresh =() => {
    console.log('refresh');
    dispatch({type: 'LOAD', data: DATA});
  }

  /* Separator item */
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
 
      <SearchInList dataList={data} />
      <SectionList
        onRefresh={() => handleRefresh()}
        refreshing={false}
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <ItemSectionHomeList navigation={navigation} title={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ListHeaderComponent={headerSectionHomeList}
        ItemSeparatorComponent={renderSeparator}
      />
      <Button title="Se deconnecter" onPress={signOut} />
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
