import 'react-native-gesture-handler';
import React from 'react';
import styles from '../styles/sectionListHome';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
//import ItemSectionList from './List/item/itemSectionHomeList';
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


const Sectionlist = ({data}) => {
  const navigation = useNavigation();
  //const data = useSelector((state) => state.dataHomeList);

  const [searchText, setSearchText] = React.useState('');
  const [dataList, setDataList] = React.useState(data);

  const handleSearch = (text) => {
    setSearchText(text);

    if (text !== '') {
      const newData = dataList.filter((item) => {
        let itemSearched = [];
        if (item.title == text) {
          itemSearched.push(item);
        }
        item.data.filter((d) => {
          if (d == text) {
            itemSearched.push(item);
            return item;
          }
        });
        if (itemSearched.length > 0) {
          setDataList(itemSearched);
        }
      });
    } else {
      setDataList(data);
    }
  };

  const renderHeader = () => (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 40,
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
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

      <SectionList
        sections={dataList}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <View />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={renderSeparator}
      />
    </SafeAreaView>
  );
};

export default Sectionlist;
