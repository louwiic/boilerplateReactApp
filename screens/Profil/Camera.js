
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Dimensions, ActivityIndicator, Image, ImageBackground} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-fontawesome-pro';
import { StatusBar } from 'react-native';
import { set } from 'react-native-reanimated';
import { useHeaderHeight } from '@react-navigation/stack';


const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ActivityIndicator size="large" color="grey" />
  </View>
);


/* Show doc RNCamera customize component https://react-native-camera.github.io/react-native-camera/docs/rncamera */
const Camera = ({navigation}) => {
  
  const headerHeight = useHeaderHeight();
  const [type, setType] = React.useState(RNCamera.Constants.Type.back)
  const [flashAction, setFlashAction] = React.useState(false)
  const [photo, setPhoto] = React.useState({
    isTaked: false,
    path: null
  })

  React.useEffect(() => {
    StatusBar.setHidden(true);

    return () => {
      StatusBar.setHidden(false)
    }
  }, [])


  const flipCamera = () =>
  setType(type === RNCamera.Constants.Type.back
    ? RNCamera.Constants.Type.front
    : RNCamera.Constants.Type.back,)



  const takePicture = async function(camera) {      
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    setPhoto({isTaked: true, path: data.uri})
  };
  

  const handleCloseViewPhoto = () => {
    setPhoto({isTaked: false, path:null})
  }


  if(photo.isTaked){
    return(
                
      <ImageBackground   source={{
        uri:
          photo.path,
        }} style={{ backgroundColor: "transparent", flex: 1, width: Dimensions.get('window').width}}>
 
        {/* tools button */}
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          <TouchableOpacity onPress={() => handleCloseViewPhoto()} style={{padding: 15}}> 
            <Icon name="times" size={30} color="#f0f0f0" />
          </TouchableOpacity>
        </View>

        <View style={{backgroundColor:"#f0f0f0", 
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        height:45, width:90, bottom:0, position: "absolute", marginBottom:20, right:20}}>

          <TouchableOpacity 
          style={{ flexDirection:"row",  alignItems: "center", justifyContent: "center" }} onPress={() => navigation.navigate('ProfilView', {path: photo.path})} > 
            <Text style={{fontSize:12}}>Envoyer</Text>
            <Icon name="angle-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }


  return (
    <View style={styles.container}>
      
      <RNCamera
       ref={cam => {
        this.camera = cam;
      }}
        style={styles.preview}
        type={type}
        flashMode={flashAction ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
          {({ camera, status, recordAudioPermissionStatus }) => {            
            if (status !== 'READY') return <PendingView />;
            return (
              
              <View>                
                <View style={{ flex: 1, top: "5%", width: Dimensions.get('window').width}}>
                  {/* tools button */}
                  <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={flipCamera} style={{padding: 15}}> 
                      <Icon name="repeat" size={30} color="#f0f0f0" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setFlashAction(!flashAction)} style={{padding: 15}}> 
                      {flashAction ?  <Icon name="lightbulb" size={30} color="#f0f0f0" /> :  <Icon name="lightbulb-slash" size={30} color="#f0f0f0" /> }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 15}}> 
                      <Icon name="times" size={30} color="#f0f0f0" />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Camera button */}
                <View style={{alignSelf:"center", marginBottom: 20}}>
                  <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                    <View style={{backgroundColor: "white", height: 60, width: 60, borderRadius: 30}} />
                  </TouchableOpacity>
                </View>
        
              </View>
            );
          }}
      </RNCamera>
    </View>
  );
}

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {

    borderColor: "white",
    backgroundColor: "transparent",
    borderWidth:2,
    borderRadius: 5,
    borderRadius: 35,
    width: 70,
    height: 70,
    //paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: "center",
    //margin: 20,
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topButtons: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
  },
  bottomButtons: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  flipButton: {
    flex: 1,
    marginTop: 20,
    padding: 15,
    //alignSelf: 'flex-start',
  },
  recordingButton: {
    marginBottom: 10,
  },
});