
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
const ItemLastOffer = ({navigation, item}) => {
  return(
    (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('Detail', {item})}>
        <View>
            <Image
                style={{height: 144,  borderRadius:8}}
                source={{
                uri: item.image,
                }}
            />
            <View style={styles.badge}>
                <Text style={styles.titleBadge}>
                🚨 Expire dans 20h
                </Text>
            </View>
            <Text style={styles.title}>50€ de réduction</Text>
            <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur</Text>
        </View>
        <View >
      
         {/* <Avatar
            rounded
            size="large"
            source={{
              uri:
                'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            }}
          /> */}
         {/*  <Text style={styles.title}>{item.original_title}</Text> */}
         
        </View>
      </TouchableOpacity>
    )
  )
}

export default ItemLastOffer;


const styles = StyleSheet.create({

    item: {
      backgroundColor: '#fafafa',
      marginTop:16,
      marginHorizontal:11,
      marginVertical: 8,
      width:158,
      height: 224,
      borderRadius: 8,
    },
    header: {
      fontSize: 30,
      backgroundColor: '#e8eaf6',
    },
    title: {
      fontSize: 12,
      color: 'black',
      marginTop: 16,
      marginHorizontal: 12,
      fontWeight: "600",
    },
    subtitle: {
      fontSize: 12,
      color: 'black',
      marginTop: 4,
      marginHorizontal: 12,
      paddingBottom: 12
    },
    badge: {
        backgroundColor: "white",
        marginLeft:8,
        borderRadius: 10,
        position:"absolute", 
        top:114,
        fontSize:10,
        padding:5,
        flexDirection: "row"
    },
    titleBadge: {
        color: gloabalStyles.main,
        fontWeight: "bold",
        fontSize:10
    }
  
  })