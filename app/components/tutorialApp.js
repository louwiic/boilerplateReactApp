import Onboarding from 'react-native-onboarding-swiper';
import 'react-native-gesture-handler';
import React from 'react';
import Icon, { configureFontAwesomePro } from 'react-native-fontawesome-pro';
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
  Image
} from 'react-native';

const TutorialApp = () => {

    const [pageIndex, setPageIndex] = React.useState(0);

    const Square = ({ isLight, selected }) => {
        let backgroundColor;
        let width;

        if (isLight) {
          backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
          //width = selected ? 10 : 0;
        } else {
          backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
          //width = selected ? null : 0;
        }
        return (
          <View
            style={{
              width: 6,
              height: 6,
              marginHorizontal: 3,
              borderRadius: 5,
              backgroundColor,
            }}
          />
        );
      };
      

    const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
    const color = isLight => backgroundColor(!isLight);

    const Next = ({ isLight, ...props }) => (

        <View style={{margin:10, padding: 10, backgroundColor: "orange"}}>
            <Icon name={item.iconLeft.name} size={item.iconLeft.size} color={item.iconLeft.color} type={item.iconLeft.type} />
        </View>
        
        
      );

      /* <Button
          title={'Suivant'}
          buttonStyle={{
            backgroundColor: backgroundColor(isLight),
          }}
          containerViewStyle={{
            marginVertical: 10,
            width: 70,
            backgroundColor: backgroundColor(isLight),
          }}
          textStyle={{ color: "blue"}}
          
        /> */
    const Skip = ({ isLight, skipLabel, ...props }) => (
        
        <Button
          title={'Skip'}
          buttonStyle={{
            backgroundColor: backgroundColor(isLight),
          }}
          containerViewStyle={{
            marginVertical: 10,
            width: 70,
          }}
          textStyle={{ color: color(isLight) }}
          {...props}
        >
          {skipLabel}
        </Button>
      );
      

    const handleDone = () => {
        console.log("Tutorial done")
    }

    return(
        <>
            {/* Custom compoent = https://www.npmjs.com/package/react-native-onboarding-swiper */}
            <Onboarding
                skipToPage={pageIndex-1}
                pageIndexCallback={ (pageIndex) =>  setPageIndex(pageIndex)}
                showSkip={true}
                transitionAnimationDuration={300}
                NextButtonComponent={Next}
                SkipButtonComponent={Skip}
                onDone={handleDone}
                pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/image1.png')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/image2.png')} />,
                    title: 'The Title',
                    subtitle: 'This is the subtitle that sumplements the title.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/image3.png')} />,
                    title: 'Triangle',
                    subtitle: "Beautiful, isn't it?",
                },
                ]}
            />
        </>
    )    
}

export default TutorialApp;
