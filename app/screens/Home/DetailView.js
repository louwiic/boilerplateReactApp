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
  ImageBackground,
  Image
} from 'react-native';
import {useDispatch} from 'react-redux';
import API from '../../services/apiconfig';

const DetailView = ({route}) => {
  const dispatch = useDispatch();
  const {item} = route.params;
  
  //console.log(route.params);
  return (
    <ScrollView style={styles.container}>
      <View>
      <Image  
        style={{width:"100%", height:500, borderBottomLeftRadius: 30}}
        source={{
              uri: API.baseUrlImage+item.poster_path,
            }}
      />
      <Text style={{fontSize: 57, fontWeight: "bold", color: "white", position: "absolute", bottom:10, right:30}}>{item.vote_average}</Text>
      </View>
      <View style={{marginHorizontal: "7%", marginTop:20}}>
        <Text style={{fontSize: 32, fontWeight: "bold"}}>{item.original_title}</Text>
        <Text>{item.overview}</Text>      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 8,
  },
});

export default DetailView;
