
import React,{Component } from 'react';
import { StyleSheet,View,Text,TextInput,ImageBackground,Image,TouchableOpacity, Button,
  KeyboardAvoidingView,Alert,Keyboard,ToastAndroid

  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const Toast = (props) => {
    if (props.visible) {
      ToastAndroid.showWithGravityAndOffset(
        props.message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        400,
      );
      return null;
    }
    return null;
  };
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        userEmail:'',
        userPassword:'',
        visible: false,
        userData:{}
        };
      }


      async storeToken(user) {
        try {
           await AsyncStorage.setItem("userData",JSON.stringify(user));
          
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
      async storeUserID(user) {
        try {
           await AsyncStorage.setItem("userID",JSON.stringify(user));
          
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
      async storeLocation(user) {
        try {
           await AsyncStorage.setItem("locationID",JSON.stringify(user));
          
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
     
    

      UserLoginFunction =  () =>{
        const { userEmail }  = this.state ;
        const { userPassword }  = this.state ;
        

       // Alert.alert(userEmail + userPassword);
        
  return     fetch('https://teammotivation.in/onlinetest/appmotivenew/ac-login.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           email: userEmail,
        
           password: userPassword
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
                console.log(responseJson.id);
               // If server response message same as Data Matched
              if(responseJson.id === 1)
               {

             //   Alert.alert('im working');
        
                   //Then open Profile activity and send user email to profile activity.
                  // console.log('Name' + responseJson.name);
                  this.storeToken(JSON.stringify(responseJson.id));
                  this.storeUserID(responseJson.uniqueID);
                  this.storeLocation(responseJson.location);
                  //console.log('userData' + this.state.userData);
              
            this.props.navigation.navigate('tabNav');
          
        
               }
               else{
        

                this.setState(
                    {
                      visible: true,
                    },
                    () => {
                      this.hideToast();
                    },
                  );
              //   Alert.alert(responseJson);
               }
        
             }).catch((error) => {
               console.error(error);
             });
        
             Keyboard.dismiss();

         }
    
         hideToast = () => {
            this.setState({
              visible: false,
            });
          };

          onP = () => {

            Alert.alert('hello')
          }
      render() {
    return (
      <>
        <KeyboardAvoidingView style={styles.body} behavior="padding" enabled>
        <View style={ styles.container}>
          <Image source={require('../assets/src/logo.png')} style={{width: 300, height:48}} />

        
        </View>
        <View style={styles.inputContainer}>
        <View style={styles.userInput }>
<Input
style ={ styles.textInput}
  placeholder='Username'
  leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
  
    />
  }

  onChangeText={userEmail => this.setState({userEmail})}

/>
 </View>
       
 <View style={styles.userInput }>
<Input
style ={ styles.textInput}
  placeholder='Password'
  leftIcon={
    <Icon
      name='lock'
      size={24}
      color='black'
  
    />
  }

  onChangeText={userPassword => this.setState({userPassword})}
  keyboardType={"numeric"}
/>
 </View>

 <View style={styles.userInput} >
   <TouchableOpacity>
     <Button      title="Login "
          color="#f194ff"
          onPress={this.UserLoginFunction}/> 
   </TouchableOpacity>
 </View>
      
 <View style={{  flexDirection:'column',alignContent:'center',marginTop:10}}>
  
  <View  >
  <TouchableOpacity    onPress={() => {this.props.navigation.navigate('password')}}        
>

<Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Forgot your Password</Text>
    
   </TouchableOpacity>
      </View>
   
     </View>

 <View style={{  flexDirection:'row',alignContent:'center',marginTop:10}}>
  
 <View  >
     <Text style={{color:'white'}}>Don't have account </Text>
     </View>
  <View  >
  <TouchableOpacity    onPress={() => {this.props.navigation.navigate('_signUp')}}        
>

<Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Sign Up</Text>
    
   </TouchableOpacity>
  </View>
 </View>
 <Toast visible={this.state.visible} message="Username or Password Wrong" />


        </View>
       
        </KeyboardAvoidingView>
      </>

    );
}
}
LoginScreen.navigationOptions = {
    header:null
}

const styles = StyleSheet.create({
  body: {

    flex:1,
    backgroundColor:'#2758d4',
    alignItems:'center'
  },
container: {

    width:'100%',
    height:90,
    backgroundColor:'white',
    borderBottomLeftRadius:60,
    borderBottomRightRadius:60,
    alignItems:'center',
    justifyContent:'center'
},
textInput: {
 borderBottomColor:'black',
 borderBottomWidth:0.3,
 backgroundColor:'white',
 height:40
},
userInput: {
width:'100%',
backgroundColor:'white',
marginVertical:5
 },
inputContainer: {
 
  width:'100%',
  maxWidth:'80%',
  alignItems:'center',
  justifyContent:'center',
  // shadowOffset: { width:0, height:2},
  // shadowRadius:5,
  // shadowOpacity:0.26,
  // backgroundColor:'white',
  // elevation:5,
  marginTop:150
  

}
});

export default LoginScreen;