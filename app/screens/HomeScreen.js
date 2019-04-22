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

import {MonoText} from '../components/StyledText';
import homeStyles from '../assets/styles/App';
import getData from '../actions/getDataFromAsyncStorage';
import {ContactsList} from "../components/ContactsList/ContactsList";
import {NavigationActions} from "react-navigation";


export default class HomeScreen extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      contacts: null,
      loading: true
    }
  };

  static navigationOptions = ({
    header: null,
  });

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

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this._isMounted = true;
  }

  render() {

    const {contacts, loading, error} = this.state;

    if (loading) return (<View style={styles.welcomeContainer}><Text>Home</Text><Text> Loading...</Text></View>);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />

            <Text>
              Home
            </Text>
          </View>

          <View>
            <ContactsList navigation={this.props.navigation} savedContacts={contacts} isSavedContacts={true}/>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = homeStyles;