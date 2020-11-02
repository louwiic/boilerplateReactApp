import Onboarding from 'react-native-onboarding-swiper';
import React from 'react';
import Icon, { configureFontAwesomePro } from 'react-native-fontawesome-pro';
import { Button } from 'react-native-elements';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Alert,
  FlatList,
  SectionList,
  Image
} from 'react-native';
import gloabalStyles from '../global/gloabalStyles';
import {useDispatch} from 'react-redux';

/* For custom component tutorial => https://github.com/jfilter/react-native-onboarding-swiper/blob/HEAD/examples/CustomButtons.jss */
const TutorialApp = ({onLoadTutorial}) => {
    const dispatch = useDispatch();
    const [pageIndex, setPageIndex] = React.useState(0);

    React.useEffect(() => {
        onLoadTutorial('true')
    },[])

    const Square = ({ isLight, selected }) => {
        let backgroundColor;
        let width;

        if (isLight) {
          backgroundColor = selected ? gloabalStyles.main2 : 'rgba(0, 0, 0, 0.3)';
          width = selected ? 16 : 8;
        } else {
          backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
          //width = selected ? null : 0;
        }
        return (
          <View
            style={{
              width,
              height: 8,
              marginHorizontal: 3,
              borderRadius: 5,
              backgroundColor,
            }}
          />
        );
      };
      

    const backgroundColor = isLight => (isLight ? gloabalStyles.main : 'lightblue');
    const color = isLight => backgroundColor(!isLight);

    const Next = ({ isLight, ...props }) => (
            <Button
            //title={''}
            icon={<Icon name={"chevron-right"} size={18} color={"#F0F0F0"} type={"solid"} />}
            buttonStyle={{
            margin:10,
            backgroundColor: backgroundColor(isLight), 
            borderRadius:24, width:48, height:48,
    
            }}

            {...props}
        /> 
        );
        
    const Skip = ({ isLight, skipLabel, ...props }) => {

        if(pageIndex === 0){
            return(
                <View />
            )
        }
        else{
            return(
                <Button
                    //title={''}
                    icon={<Icon name={"chevron-left"} size={18} color={gloabalStyles.gray} type={"solid"} />}
                    buttonStyle={{
                    margin:10,
                    backgroundColor: "white", 
                    borderRadius:24, width:48, height:48,borderWidth:1,
                    borderColor: gloabalStyles.gray2
            
                    }}
                    {...props}
                /> 
            )
        }
    };
      

    const handleDone = () => {
        console.log("Tutorial done")
        onLoadTutorial('false')
    }

    function handleIndexPage(pageIndex){        
        setPageIndex(pageIndex)
    }

    return(
        <>
            {/* Custom compoent = https://www.npmjs.com/package/react-native-onboarding-swiper */}        
            <Onboarding             
                DotComponent={Square}        
                bottomBarColor={"white"}
                bottomBarHighlight={false}
                skipToPage={pageIndex === 0 ? 0 : pageIndex-1}
                pageIndexCallback={ (pageIndex) => handleIndexPage(pageIndex) }
                showSkip={true}
                transitionAnimationDuration={300}
                NextButtonComponent={Next}
                SkipButtonComponent={Skip}        
                onDone={handleDone}                      
                pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/image1.png')} />,
                    title: 'Insigth 1',
                    subtitle: 'Mauris facilisis justo eu erat suscipit, in porttitor orci aliquam. Curabitur dignissim luctus nisl nec rutrum. ',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/image2.png')} />,
                    title: 'Insigth 2',
                    subtitle: 'Mauris facilisis justo eu erat suscipit, in porttitor orci aliquam. Curabitur dignissim luctus nisl nec rutrum. .',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/image3.png')} />,
                    title: 'Insigth 3',
                    subtitle: "Mauris facilisis justo eu erat suscipit, in porttitor orci aliquam. Curabitur dignissim luctus nisl nec rutrum. ",
                },
                ]}
            />
    
          
        </>
    )    
}

export default TutorialApp;
