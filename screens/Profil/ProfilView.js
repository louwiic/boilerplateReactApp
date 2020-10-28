import 'react-native-gesture-handler';
import React from 'react';
import {Avatar, Accessory} from 'react-native-elements';
import Icon from 'react-native-fontawesome-pro';
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
} from 'react-native';
import {useDispatch} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RNCamera } from 'react-native-camera';




const ProfilView = ({navigation}) => {
    const [takePicture, setTakePicture] = React.useState(false)

    if(takePicture){
        return(
            <>‍
            <SafeAreaView styles={{flex:1}}>‍                        
                <RNCamera 
                ref={ref => {
                this.camera = ref;
                }}
                captureAudio={false}
                style={{flex: 1}}
                type={RNCamera.Constants.Type.back}
                androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
                }} />
            </SafeAreaView>‍
          </>
    
        )
    }

    return(
      <View style={styles.container}>
    
        <View style={{marginTop: 20,alignItems:"center", justifyContent:"center"}}>
            <Avatar
                rounded
                size={150}
                source={{
                    uri:
                    'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
                }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('camera')} style={{marginTop: 30, borderWidth:1, padding:20, borderRadius: 20}}>
                <Icon 
                    name={"camera-retro"}
                    color={"black"}
                    type="regular"
                    size={24}
                />
            </TouchableOpacity>
        </View>

        <View style={{backgroundColor: "#cfd8dc", borderTopLeftRadius: 45, marginTop: 20, flex:2}}>
    
        </View>



      </View>
    )
  }

  const styles = StyleSheet.create({
    label: {
      color: 'black',
      margin: 20,
      marginLeft: 0,
    },
    container: {
      flex: 1,
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

  export default ProfilView;