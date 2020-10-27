import 'react-native-gesture-handler';
import React from 'react';
import styles from '../styles/sectionListHome';
import {Avatar, Accessory} from 'react-native-elements';

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
} from 'react-native';

const Item = ({title}) => (
  <View style={styles.item}>
    <View style={{flexDirection: 'row'}}>
      <Avatar
        rounded
        size="large"
        source={{
          uri:
            'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        }}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
);

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

const Sectionlist = ({data}) => {
  const [searchText, setSearchText] = React.useState('');
  const [dataList, setDataList] = React.useState();

  const [value, onChangeText] = React.useState('Useless Placeholder');

  React.useEffect(() => {
    setDataList(data);
  }, []);

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
      }}></View>
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
        renderItem={({item}) => <Item title={item} />}
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
