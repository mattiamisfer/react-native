import React from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity} from 'react-native';
import Logo from '../components/MinLogo';
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';


class VideoPlayerr extends React.Component {

    constructor(props)
     {
         super(props);
         this.state = {
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState:PLAYER_STATES,
            screenType: 'cover',
            loggedIn:'',
            userID:'',
            locationID:'',
            videoPath:'',
            subject:'',
            topic:'',
            faculty:'',
            profName:''


         }
     }


     _logout = () => {
      //alert('logout');
      this.props.navigation.navigate('_signOut');
    }
    static navigationOptions = ({ navigation })  => {

      return {
        headerLeft: null,
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


  
    fetchData = () => {
        return fetch('https://teammotivation.in/onlinetest/appmotivenew/videopath.php', {
          method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    //   userID : this.props.navigation.state.params.userID,
    //   locationID: this.props.navigation.state.params.locationID,
    //   topicID :this.props.navigation.state.params.topicID,
    
    Vid:this.props.navigation.state.params.Vid
          
          // locationID: this.state.locationID,
          // userID: this.state.userID
       
    
       
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
       //  console.log('My Data' + responseJson)
         this.setState({
          
            videoPath: responseJson.path,
            subject:responseJson.subject,
            topic:responseJson.topicName,
            faculty:responseJson.faculty,
            profName:responseJson.prof
        }, function() {
          // In this block you can do something with new state.
        });
        })
        .catch((error) => {
          console.error(error);
        });
      }



      onSeek = seek => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
      };
     
      onPaused = playerState => {
        //Handler for Video Pause
        this.setState({
          paused: !this.state.paused,
          playerState,
        });
      };



      onReplay = () => {
        //Handler for Replay
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
      };

times = (num) => {
  const hours = Math.floor(num / 60);  
  const minutes = num % 60;
  return hours + ":" + Math.round(minutes);  
} 

      onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
          this.setState({ currentTime: data.currentTime });
        }
      };
      
      onLoad = data => this.setState({ duration: data.duration, isLoading: false });
      
      onLoadStart = data => this.setState({ isLoading: true });
      
      onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
      
      onError = () => alert('Oh! ', error);
      
      exitFullScreen = () => {
        alert('Exit full screen');
      };
      
      enterFullScreen = () => {};
      
      onFullScreen = () => {
        if (this.state.screenType == 'content')
          this.setState({ screenType: 'cover' });
        else this.setState({ screenType: 'content' });
      };
      renderToolbar = () => (
        <View style={{flexDirection:'column',flex:1,width:'100%',justifyContent:'center',}}>
          <View style={{ alignContent:'center',alignItems:'center',backgroundColor:'green',padding:5  }}> 
          <Text> Video Discription </Text>
          </View>
            <View style={{flexDirection:'column',flex:1}}>
            <View style={styles.devide}>
              <Text  >Subject</Text>
              <Text>{this.state.subject}</Text>


            </View>
            <View style={styles.devide}>
              <Text  >Topic</Text>
              <Text>{this.state.topic}</Text>


            </View>

            <View style={styles.devide}>
              <Text  >Faculty</Text>
              <Text>{this.state.faculty}</Text>


            </View>

            <View style={styles.devide}>
              <Text  >Duration of Video</Text>
              <Text>{this.times(this.state.duration) }</Text>


            </View>

            <View style={styles.devide}>
              <Text  >Facebook Page Professor</Text>
              <TouchableOpacity>
              <Text>Click</Text>
              </TouchableOpacity>


            </View>

            </View>
            <View style={{ alignContent:'center',alignItems:'center', padding:5 ,flex:1 }}> 
          <Text> Visit www.teammotivation.in </Text>
          </View>
       
        </View>
      );
      onSeeking = currentTime => this.setState({ currentTime });

      componentDidMount() {
          this.fetchData();
          this.props.navigation.setParams({ logout: this._logout });

      }
   render() {
    const { navigate } = this.props.navigation;
const durationTime = this.state.duration *60/60;
    return (
        <View style={styles.screen}>
          <View style={{justifyContent:'space-between',alignContent:'center',alignItems:'center',flexDirection:'row',width:'90%',paddingHorizontal:10}}>
          <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
          <Text style={{ fontSize:35}}>{this.state.subject} </Text>
          </View>
          </View>

          <View style={{justifyContent:'space-between',flexDirection:'row',width:'90%',paddingHorizontal:0}}>
          <View>
          <Text style={{ fontSize:18,fontStyle: 'italic' }}>{this.state.topic}</Text>
          </View>
          </View>
            <View style={{flexDirection:'row',width:'90%',justifyContent:'space-between',paddingHorizontal:0}}>
            
              <Text>{this.state.profName}</Text>


            
              <TouchableOpacity  underlayColor={'gray'} style={{padding:5}} onPress={() => Linking.openURL('maps://app?saddr=Cupertino&San+Francisco')}>
              <Text>FB Profile</Text>
              </TouchableOpacity>


            
            </View>

        
           <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{ uri: this.state.videoPath }}
          style={styles.mediaPlayer}
          volume={10}
        />
            

        
      

        <MediaControls
       
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="red"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
         
        />
        
        <View style={{justifyContent:'space-between',flexDirection:'row',width:'100%',paddingHorizontal:10}}>
        <Text>{this.times(this.state.duration) }</Text>
          </View>
       
        </View>
   );
   }
};




const styles = StyleSheet.create({
screen: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    alignContent: 'space-between',
    flexDirection:'column',

    backgroundColor:'#eaeaea'
},
font: {
    color:'#fafafa',
    fontSize:12,
},
logOut: {
  marginRight:10
},
toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
 
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    width:'100%',
     height:225
  },
  devide : {
    flexDirection:'row', justifyContent:'space-between',marginHorizontal:25
  }
});

export default VideoPlayerr;