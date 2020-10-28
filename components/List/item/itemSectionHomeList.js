
import React from 'react';
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
    TouchableOpacity,
  } from 'react-native';
  import styles from '../../../styles/sectionListHome';


/* template item */
const ItemSectionList = ({navigation, title}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detail', {title})}>
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
    </TouchableOpacity>
  );

  export default ItemSectionList;