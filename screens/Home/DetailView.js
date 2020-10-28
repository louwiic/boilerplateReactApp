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
} from 'react-native';
import {useDispatch} from 'react-redux';

const DetailView = ({route}) => {
  const dispatch = useDispatch();
  const {title} = route.params;
  //console.log(route.params);
  return (
    <View style={styles.container}>
      <Text>Détails View 🎉</Text>
      <Text>{title}</Text>
      <Button
        title="Ajouter Cocktail"
        onPress={() =>
          dispatch({
            type: 'UPDATE',
            data: {
              title: 'Cocktail',
              data: ['Rhum', 'Punch', 'Sunrise'],
            },
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginLeft: '4%',
    marginRight: '4%',
    //padding: 8,
  },
});

export default DetailView;
