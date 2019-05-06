import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import {WebBrowser} from 'expo';
import deepDiffer from 'react-native/lib/deepDiffer';
import {NavigationActions} from "react-navigation";

import {MonoText} from '../components/StyledText';
import homeStyles from '../assets/styles/App';
import getData from '../actions/getDataFromAsyncStorage';
import {ContactsList} from "../components/ContactsList/ContactsList";
import FloatingAddContactButton from "../components/FloatingAddContactButton";


export default class HomeScreen extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      contacts: null,
      loading: true
    }
  };

  static navigationOptions = () => {
    return {
      header: null,
      tabBarOnPress({navigation, defaultHandler}) {
        defaultHandler();
      },
      onTabPress({navigation, defaultHandler}) {
        defaultHandler();
      }
    }
  };

  componentDidMount() {
    this._isMounted = true;

    var that = this;
    getData().then((response) => {

      if (this._isMounted && response) {
        that.setState({
          contacts: JSON.parse(response) || null,
          loading: false
        });
      }

    });
  }

  componentDidUpdate(prevProps, prevState){

    if(this.props.screenProps.homeScreenUpdate) {

      this.setState({
        loading: true
      })

      setTimeout(() => {
        this.getSavedData()
      }, 200);
      this.props.screenProps.homeScreenUpdate = false
    }

  }

  getSavedData() {
    this._isMounted = true;

    var that = this;
    getData().then((response) => {

      console.log(JSON.parse(response))
      if (this._isMounted && response) {
        that.setState({
          contacts: JSON.parse(response) || null,
          loading: false
        });
      }

    });
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  checkUpdates(updated) {
    if (updated) {
      this.props.screenProps.homeScreenUpdate = true;
      setTimeout(() => {
        this.getSavedData()
      }, 200)
    }
  }

  render() {
    const {contacts, loading, error} = this.state;

    if (loading) return (<View style={styles.welcomeContainer}>
      <Image source={
        __DEV__
          ? require('../assets/images/robot-dev.png')
          : require('../assets/images/robot-prod.png')
      }
      style={styles.welcomeImage}
    />
      <Text> Loading...</Text></View>);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View>
            <ContactsList navigation={this.props.navigation} savedContacts={contacts} isSavedContacts={true}
                          checkUpdates={this.checkUpdates.bind(this)}/>

          </View>

        </ScrollView>

        <FloatingAddContactButton navigation={this.props.navigation} isNewContact={true} checkUpdates={this.checkUpdates.bind(this)}/>

      </View>
    );
  }
}

const styles = homeStyles;