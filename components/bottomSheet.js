import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
  Alert,
  Dimensions,
  Platform
} from 'react-native';

import {ActionSheet} from 'react-native-cross-actionsheet';
import BottomSheet from 'react-native-bottomsheet';

const BottomSheetAction = (opts) => {


    if (Platform.OS === 'ios') {
        ActionSheet.options({
          options: [
            {
              text: opts[0].title,
              onPress: opts[0].callback,
            },
            {
                text: opts[1].title,
                onPress: opts[1].callback,
            },
            {
                text: opts[2].title,
                onPress: opts[2].callback,
            },
            // { text: 'Delete', destructive: true, onPress: () => console.log('delete') }
          ],
          cancel: {text: 'Annuler', onPress: () => console.log('cancel')},
          //tintColor: "red",
          // anchor : 2
        });
      } else {
         BottomSheet.showBottomSheetWithOptions(
          {
            options: ['Ouvrir avec Google maps', 'Ouvrir avec Waze', 'Annuler'],
            title: 'Choissisez une action',
            dark: false,
            cancelButtonIndex: 3,
          },
          (value) => {
            switch (value) {
              case 0:
                 () => { }
                break;
              case 1:
                 () => { }
                break;
              default:
                break;
            }
            //alert(value);
          },
        ); 
      }
}

export {BottomSheetAction}