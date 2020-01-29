/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
 StyleSheet,View,Text,ActivityIndicator,StatusBar, Alert
} from 'react-native';

import HomeNavigation from './navigation/HomeNavigation';



export default class App extends Component {


render() {
  return <HomeNavigation screenProps={{
    //pass any object you need for ex
    testing:true
  }}/>;
}
}

const styles = StyleSheet.create({
Text: {
  fontFamily:'Raleway-BoldItalic'
}
});