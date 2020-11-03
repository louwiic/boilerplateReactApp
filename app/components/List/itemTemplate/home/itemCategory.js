
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
import API from '../../../../services/apiconfig';
import gloabalStyles from '../../../../global/gloabalStyles';
import Icon from 'react-native-fontawesome-pro';


/* template item */
const ItemCategory = ({navigation, item}) => {
  return(
    (
      <TouchableOpacity
        style={[styles.item,{ backgroundColor: item.color ? item.color: null}]}
        onPress={() => navigation.navigate('Detail', {item})}>
        <View style={styles.containerTile}>
            <Text style={styles.title}>Nos produits du moment</Text>
        </View>
      </TouchableOpacity>
    )
  )
}

export default ItemCategory;


const styles = StyleSheet.create({

    item: {
      backgroundColor: '#fafafa',
      marginTop:16,
      marginHorizontal:11,
      marginVertical: 8,
      width:271,
      height: 120,
      borderRadius: 8,
    },
    header: {
      fontSize: 30,
      backgroundColor: '#e8eaf6',
    },
    containerTile:{
        padding:10
    },  
    title: {
      fontSize: 26,
      color: 'white',
      marginTop: 16,
      marginHorizontal: 12,
      fontWeight: "bold",
    },
  
  })