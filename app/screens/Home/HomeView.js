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
  FlatList,
  SectionList,
} from 'react-native';
import axios from 'axios';
import Icon, {configureFontAwesomePro} from 'react-native-fontawesome-pro';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {AuthContext} from '../../components/context';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import List from '../../../app/components/flatlist';
import ItemSectionHomeList from '../../components/List/itemTemplate/home/itemSectionHomeList';
import headerSectionHomeList from '../../components/List/itemTemplate/home/headerSectionHomeList';
import SearchInList from '../../../app/components/List/searchInList';
import {Rect} from 'react-native-svg';
import API from '../../services/apiconfig';
import gloabalStyles from '../../global/gloabalStyles';
import ItemLastOffer from '../../components/List/itemTemplate/home/itemLastOffer';
import ItemCategory from '../../components/List/itemTemplate/home/itemCategory';
import ItemNews from '../../components/List/itemTemplate/home/itemNews';

const DATA = [
  {
    title: '50€ de réduction',
    image: "https://images.unsplash.com/photo-1525802498323-c8fbf69eb42f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  },
  {
    title: '50€ de réduction',
    image: "https://images.unsplash.com/photo-1598863955097-e765dbf782df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
  },
  {
    title: '50€ de réduction',
    image: "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
  },
  {
    title: '50€ de réduction',
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  },
];


const CATEGORIES = [
  {
    title: 'Nos produits du moment',
    image: "https://images.unsplash.com/photo-1525802498323-c8fbf69eb42f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    color: "#fb8c00"
  },
  {
    title: 'Nos produits du moment',
    image: "https://images.unsplash.com/photo-1598863955097-e765dbf782df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
    color: "#ffd54f"
  },
  {
    title: 'Nos produits du moment',
    image: "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
    color:"#c0ca33"
  }, 
];

const HomeView = ({navigation}) => {
  const data = useSelector((state) => state.dataHomeList);
  const dispatch = useDispatch();
  const [loadingPR, setLoadingPR] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const {register, setValue, handleSubmit, errors} = useForm();
  const onSubmit = (data) => Alert.alert('Form Data', JSON.stringify(data));

  React.useEffect(() => {
    register({name: 'firstName'}, {required: true});
    register({name: 'lastName'});
  }, [register]);

  React.useEffect(() => {
    reload(page);
  }, []);

  //Relaod after change page
  React.useEffect(() => {
    if (page > 1) {
      //fetch data here
      var timer = setTimeout(() => {
        reload(page);
      }, 0);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [page]);


  function reload(page) {
    API.getMovies({page: page})
      .then(function (response) {
        if (page === 1) {
          setLoadingPR(false);
          dispatch({type: 'LOAD', data: response.data.results});
        } else {
          setLoadingPR(false);
          dispatch({type: 'PAGINATE', data: response.data.results});
        }
      })
      .catch(function (error) {
        setLoadingPR(false);
        console.log(error);
      });
  }

  const handlePaginate = () => {
    setPage(page + 1);
  };

  const handleRefresh = () => {
    setLoadingPR(true);
    setPage(1);
    reload(1);
  };

  /* Separator item */
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

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 32}}> Movies</Text>
      <FlatList
        onEndReached={handlePaginate}
        onEndReachedThreshold={0}
        onRefresh={() => handleRefresh()}
        refreshing={loadingPR}
        keyExtractor={(item, index) => index.toString()}
        data={data.arr}
        renderItem={({item}) => (
          <ItemSectionHomeList navigation={navigation} item={item} />
        )}
      />


   
      
      <FlatList  
          horizontal={true}
          showsHorizontalScrollIndicator={false} 
          onEndReached ={handlePaginate}
          onEndReachedThreshold={0}
          onRefresh={() => handleRefresh()}
          refreshing={loadingPR}            
          keyExtractor={(item, index) => index.toString()}
          data={CATEGORIES}
          renderItem={({item}) => <ItemCategory navigation={navigation} item={item} />}
        />  

      <View style={{justifyContent: "space-between", flexDirection: "row", marginHorizontal:"4%", marginTop: 30}}>
        <Text style={{fontWeight:"700", fontSize:16, }}>{I18n.t('titleNew')}</Text>
        <Text  style={{fontWeight:"700", fontSize:13, color: gloabalStyles.main}}>Tout afficher</Text>
      </View>
      
      <FlatList  
          horizontal={true}
          showsHorizontalScrollIndicator={false} 
          onEndReached ={handlePaginate}
          onEndReachedThreshold={0}
          onRefresh={() => handleRefresh()}
          refreshing={loadingPR}            
          keyExtractor={(item, index) => index.toString()}
          data={DATA}
          renderItem={({item}) => <ItemNews navigation={navigation} item={item} />}
        />  


      {/*  Section List example show DATA on Top for format data sectionList      
      <SectionList
        onRefresh={() => handleRefresh()}
        refreshing={false}
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <ItemSectionHomeList navigation={navigation} title={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ListHeaderComponent={headerSectionHomeList}
        ItemSeparatorComponent={renderSeparator}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
  },
  container: {
    flex: 1,
    paddingTop: 20,
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

export default HomeView;
