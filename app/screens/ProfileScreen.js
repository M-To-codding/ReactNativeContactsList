import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import {View, Text, Button, BackHandler, FlatList} from 'react-native';
import {Header, Icon, List} from 'react-native-elements';
import { NavigationActions, HeaderBackButton } from 'react-navigation';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Profile',
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)}/>
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ title: "Profile" })
    BackHandler.addEventListener('hardwareBackPress',   this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress',  this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  render() {

    return (
      <View>
        <Text>Profile</Text>
      </View>
    );
  }
}
