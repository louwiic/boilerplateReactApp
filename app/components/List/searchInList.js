

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
  FlatList,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';

  const searchInList = ({dataList}) => {
    const [searchText, setSearchText] = React.useState('');
    const dispatch = useDispatch();

  const handleSearch = (text) => {
    dispatch({
      type: 'SEARCH_IN_LIST',
      data: text
    })
  }
    return(
      <TextInput
      clearButtonMode="always"
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={(text) => handleSearch(text)}
      status="info"
      placeholder="Rechercher"
      style={{
        height: 48,
        borderRadius: 25,
        borderColor: 'black',
        backgroundColor: '#fff',
      }}
      textStyle={{color: '#000'}}
    />
    )
  };

  export default searchInList;