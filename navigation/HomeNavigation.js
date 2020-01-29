import React from 'react';
import {
    ActivityIndicator,
   
    StatusBar,
    StyleSheet,
    View,
    Alert,
    TouchableOpacity
  } from 'react-native';
  import AsyncStorage from '@react-native-community/async-storage';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromLeft } from 'react-navigation-transitions'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Logo from '../components/MinLogo';

 
import HomeScreen from '../screens/HomeScreen';
import DoubtScreen from '../screens/DoubtScreen';
import TestListScreen from '../screens/TestListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ResultScreen from '../screens/ResultListScreen';
import NotificationScreen from '../screens/NotificationScreen';
import LoginScreen from '../screens/LoginScreen';
import QuestionScreen from '../screens/QuestionScreen';

import Result from '../screens/SubmitData';
 
import Colors from '../constants/Colors';
import TopicListScreen from '../screens/TopicListScreen';
import SubjectListScreen from '../screens/SubjectListScreen';
import InstructionScreen from '../screens/InstructionScreen';
import PlayQuizScreen from '../screens/Quiz';

import QuesList from '../screens/QuesList';
import Graph from '../screens/Graph';

import VideoList from '../screens/VideoList';
import VideoPlayer from '../screens/VideoPlayer';

import SignUp from '../screens/SignupScreen';
import PasswordScreen from '../screens/PasswordScreen';

import VideoTopic from '../screens/VideoTopic';
import VideoSubTopic from '../screens/VideoSubTopic';
import MaterialScreen from '../screens/MaterialScreen';

// class HomeNavigation extends React.Component {
//     componentDidMount() {
//         this._bootstrapAsync();
//       }

//       _bootstrapAsync = async () => {
//         const userToken = await AsyncStorage.getItem('userData');
    
//         // This will switch to the App screen or Auth screen and this loading
//         // screen will be unmounted and thrown away.
//         this.props.navigation.navigate(userData ? 'tabNav' : 'authLoading');
//       };

//       render() {
//         return (
//           <View>
//             <ActivityIndicator />
//             <StatusBar barStyle="default" />
//           </View>
//         );
//       }
// }

class AuthLoading extends React.Component {
    componentDidMount() {
        this._bootstrapAsync();
        this.props.navigation.setParams({ logout: this._logout });

      }

     
    constructor(props) {
      super(props);
      this.state = {
        loggingID:''
      }

    }
      _bootstrapAsync = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const data = JSON.parse(userData);
        // const user =   this.setState({ loggingID: data }); 
    //   Alert.alert(data);
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        console.log(data);
        this.props.navigation.navigate(data ==='1' ? 'tabNav' : 'Login');
      };

      render() {
        return (
          <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </View>
        );
      }
}

const styles = StyleSheet.create({
  
  logOut: {
    marginRight:10
  },
  });
  


const TabScreen = createMaterialTopTabNavigator(
  {
    QuesList: { screen: QuesList,  navigationOptions: {
      tabBarLabel:'Answer Key'} },
    Graph: { screen: Graph, navigationOptions: {
      tabBarLabel:'Answer Distribution'}  },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#633689',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  },
  
);




class SignOut extends React.Component {
    componentDidMount() {
  this._signOutAsync();
    }
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
      };
      render() {
        return (
          <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </View>
        );
      }
}

const _signUp  = createStackNavigator({
  SignUp:SignUp
  });

  const _password  = createStackNavigator({
    password:PasswordScreen
    });
const _signOut  = createStackNavigator({
SignOut:SignOut
});


const _ResultScreen = createStackNavigator({
  _ResultScreen:ResultScreen
})


const Doubts = createStackNavigator (
  {
   Doubt:DoubtScreen
  }, {
    initialRouteName: 'Doubt',
transitionConfig: () => fromLeft(1000)
  }
);


const _notification = createStackNavigator (
  {
   note:NotificationScreen
  }, {
    initialRouteName: 'note',
transitionConfig: () => fromLeft(1000)
  }
);

const LoginNav = createStackNavigator (
  {
   Login:LoginScreen
  }, {
    initialRouteName: 'Login',
transitionConfig: () => fromLeft(1000)
  }
);

const HomeNavigation = createStackNavigator({
  VideoList:VideoList,
  VideoPlayer:VideoPlayer,
  TabScreen:{
    screen:TabScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: (props) => <Logo />,
      
    }),
  },
  Result:Result,
  Instuction:{
    screen:InstructionScreen
  },
TopicList: {
  screen:TopicListScreen,
   
},
SubjectList:SubjectListScreen,
  QuestionList:QuestionScreen,
Home:HomeScreen,
Doubt:{
    screen:DoubtScreen
},
 
TestList:TestListScreen,
Profile: {
    screen:ProfileScreen
} , VideoTopic:VideoTopic,
VideoSubTopic,VideoSubTopic,
MaterialScreen:MaterialScreen

},
{
    initialRouteName: 'Home',
transitionConfig: () => fromLeft(1000)
}
);

 



const TabNavigation = createBottomTabNavigator({

 // Login:LoginScreen,
Home:{

    screen:HomeNavigation,
    navigationOptions: {
   
        tabBarIcon: tabInfo => {
            return (
                <Icon
  
  name='home'
  type='antdesign'
  color={Colors.primaryColor} size={25}/>
            );
        }
    }
},
 
// Profile: {
//     screen:ProfileScreen,
//     navigationOptions: {
//         tabBarLabel:'Profile!',
//         tabBarIcon: tabInfo => {
//             return (
//                 <Icon
  
//   name='user'
//   type='antdesign'
//   color={Colors.primaryColor} size={25}/>
//             );
//         }
//     }
// },


// Quiz: {
//   screen:PlayQuizScreen,
//   navigationOptions: {
//       tabBarLabel:'Quiz!',
//       tabBarIcon: tabInfo => {
//           return (
//               <Icon

// name='user'
// type='antdesign'
// color={Colors.primaryColor} size={25}/>
//           );
//       }
//   }
// },
Result: {
    screen:_ResultScreen,
    navigationOptions: {
        tabBarLabel:'Results',
        tabBarIcon: tabInfo => {
            return (
                <Icon
  
  name='results'
  type='foundation'
  color={Colors.primaryColor} size={25}/>
            );
        }
    }
},
Doubt: {
    screen:Doubts,
    navigationOptions: {
        tabBarLabel:'Doubt',
        tabBarIcon: tabInfo => {
            return (
                <Icon
  
  name='question-circle'
  type='font-awesome'
  color={Colors.primaryColor} size={25}/>
            );
        }
    }
},

Notification: {
  screen:_notification,
  navigationOptions: {
      tabBarLabel:'Ask',
      tabBarIcon: tabInfo => {
          return (
              <Icon

name='bell'
type='font-awesome'
color={Colors.primaryColor} size={25}/>
          );
      }
  }
}


},  {
  

 
    initialRouteName:'Home',
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
        fontFamily:'Raleway-MediumItalic'
                 },
              tabBarOptions : {
                activeTintColor :'white',
                activeBackgroundColor:'#fa5d5d'
              },
              style :{
                fontFamily:'Raleway-MediumItalic',
                marginTop:10
              },
              allowFontScaling:50
}

 
);


// const MainNavigatior = createDrawerNavigator({


//     AllQuestionList:{
//         screen:HomeNavigation,
//         navigationOptions: {
//             drawerLabel: 'Meals'
//           }
//     },
    
//     });

const MainNav  = createSwitchNavigator({

    AuthLoading:AuthLoading,
    Login:LoginNav,
    RouteNav:HomeNavigation,
    tabNav:{
      screen:TabNavigation
    },
    _signOut:_signOut,
    HomeScreen:HomeScreen,
    TestListScreen:TestListScreen,
    _signUp:_signUp,
    password:_password
 
  

}, {
    initialRouteName: 'AuthLoading',
  });









 export default createAppContainer(MainNav);