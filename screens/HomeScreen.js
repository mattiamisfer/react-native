import React from 'react';
import {StyleSheet,View,Text,Button, Alert,TouchableOpacity,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SliderBox } from "react-native-image-slider-box";
import MarqueeText from 'react-native-marquee';
import { ListItem,Icon } from 'react-native-elements'

import Logo from '../components/MinLogo';
class  HomeScreen  extends React.Component {
  // static navigationOptions = {
  //   title:'Hello'
  // }

    constructor(props) {
        super(props);
        this.state = {
        
            userData: '',
            userID:'',
            loggedIn:'',
            locationID:'',
            value: 50,
            images: []
          };
      
    }


    fetchData = () => {
      return fetch('https://teammotivation.in/onlinetest/appmotivenew/sliderimg.php', {
        method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
  
  
        
        // locationID: this.state.locationID,
        // userID: this.state.userID
     
  
     
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
       console.log('My Data' + responseJson.img)
       this.setState({
        
        images: responseJson.img
      }, function() {
        // In this block you can do something with new state.
      });
      })
      .catch((error) => {
        console.error(error);
      });
    }
    change(value) {
      this.setState(() => {
        return {
          value: parseFloat(value),
        };
      });
    }
    

    componentDidMount() {
        this.getToken();
        this.fetchData()
       this.props.navigation.setParams({ logout: this._logout });

      }

      // logOut =() => {

      //   console.log('Sign Out');
      // //  this.props.navigation.navigate('_signOut');
      // }
      _logout = () => {
        //alert('logout');
        this.props.navigation.navigate('_signOut');
      }
      static navigationOptions = ({ navigation })  => {
 
        return {
         
         headerTitle: (props) => <Logo />,
         headerRight: () => (
           <TouchableOpacity style={styles.logOut} onPress={navigation.getParam('logout')} >
           <Icon
          
           name='md-log-in'
           type='ionicon'
           color='#496bea' 
           size={30}
          
           />
           </TouchableOpacity>
     
         ), headerRightStyle: {
          backgroundColor:'#4A94FB',
          borderBottomColor: 'transparent',
         }
     
          
         }
     }

    async getToken(user) {
        try {
          let userData = await AsyncStorage.getItem("userData");
          let _userID = await AsyncStorage.getItem("userID");
          let _locationID = await AsyncStorage.getItem("locationID");

          const data = JSON.parse(userData);
          const userID = JSON.parse(_userID);
          const locationID = JSON.parse(_locationID);
        this.setState({ loggedIn: data }); 
        this.setState({ userID: userID }); 
        this.setState({locationID:locationID});
        // this.state.userData.map((data) => {
        // console.log(data.id);
        // });
       // Alert.alert(data);
        console.log('results' + data);
          
        } catch (error) {
          console.log("Something went wrong", error);
        }
    }
 
    render() {
      const {value} = this.state;
      // const lapsList = this.state.userData.map((data) => {
      //   return (
      //     <View><Text>{data.id}</Text></View>
      //   )
      // })
      const list = [
        {
          name: 'Online Test Series (All Tests)',
          avatar_url: 'https://teammotivation.in/onlinetest/appmotivenew/yes.png',
          subtitle: 'Vice President',
          icon: 'av-timer',
          path:'TopicList',
          param: {
            userID:this.state.userID,
            locationID:this.state.locationID
          }
        },
        {
          name: 'Test and Discuss Video',
          avatar_url: 'https://teammotivation.in/onlinetest/appmotivenew/mouse.png',
          subtitle: 'Vice President',
          icon: 'md-arrow-forward',
          path:'VideoTopic',
          param: {
            userID:this.state.userID,
            locationID:this.state.locationID
          }
        },
        {
        name: 'E- Library(Download - PDF)',
          avatar_url: 'https://teammotivation.in/onlinetest/appmotivenew/study.png',
          subtitle: 'Vice President',
          icon: 'md-arrow-forward',
          path:'MaterialScreen',
          param: {
            userID:this.state.userID,
            locationID:this.state.locationID
          }
        },
        
      ]
  
    return (

      <ScrollView> 
         <View style={styles.screen}>
           {/* <TouchableOpacity onPress={ () => {
             this.props.navigation.navigate('TopicList', {
              itemId: 86,
              otherParam: 'Misfer',
            });
           }}>
             
    <Text>Logouts...</Text>
           </TouchableOpacity> */}

           <View style={{alignItems:'center',marginVertical:'2%'}}>
             <Text style={{color:'#666666',fontSize:18}}>Welcome To Team Motivation</Text>
           </View>

        <View style={{ width:'90%',flex:1,marginBottom:2}}>
  {
    list.map((item, i) => (
     <TouchableOpacity style={{paddingVertical:'1%',marginBottom:'1%',flex:1,flexDirection:'column'}}  key={i} onPress={() => {  this.props.navigation.navigate(item.path, {
       userID:item.param.userID,
       locationID:item.param.locationID
       
     })}}> 
      <ListItem
      style={{paddingVertical:0}}
        leftAvatar={{ source: { uri: item.avatar_url } }}
        title={item.name}
          
       
        rightIcon={ <Icon
          name='md-arrow-forward'
          type='ionicon'
          color='#517fa4'
        />}
       
        bottomDivider

      />
      </TouchableOpacity>
    ))
  }
</View>

<View style={styles.container}>

  
<SliderBox
  images={this.state.images}
  
/>

      </View>

      <View style={styles.containerMarque}>
        {/* <MarqueeText
          style={{ fontSize: 24 }}
          duration={30000}
          marqueeOnStart
          loop
          marqueeDelay={10000}
          marqueeResetDelay={10000}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry.
        </MarqueeText> */}

        <Text>
        Teammotivation is the only instutute which is involved in the total spectrum of coaching for foreign medical graduates.  The complete syllabus shall be covered in a meticulous manner in the entire program: a true blend of the subject, the analysis and complete coverage of the chapter, various types of tests, query section, the discussion on thousands of MCQs covering all aspects of the medicinal methodology.
        </Text>
      </View>
         </View></ScrollView>
    );
    }
}





const styles = StyleSheet.create({
screen: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  
    
},
logOut: {
  marginRight:10
},
container: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop:10
},
text: {
  fontSize: 50,
  textAlign: 'center',
},
containerMarque : {
  flex: 1,
    justifyContent: 'center',
    paddingVertical:5,
    paddingHorizontal:10
}
});

export default HomeScreen;