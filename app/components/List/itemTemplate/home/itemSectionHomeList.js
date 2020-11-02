
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
    Image
  } from 'react-native';
  import styles from '../../../../styles/sectionListHome';
import API from '../../../../services/apiconfig';


/* template item */
const ItemSectionList = ({navigation, item}) => {
  return(
    (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Detail', {item})}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 180, width: 120, borderRadius: 10}}
            source={{
              uri: API.baseUrlImage+item.poster_path,
            }}
          />
         {/* <Avatar
            rounded
            size="large"
            source={{
              uri:
                'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            }}
          /> */}
          <Text style={styles.title}>{item.original_title}</Text>
         
        </View>
      </TouchableOpacity>
    )
  )
}

  export default ItemSectionList;