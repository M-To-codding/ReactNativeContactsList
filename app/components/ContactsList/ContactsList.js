import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  RefreshControl,
  Dimensions
} from 'react-native';
import {List, ListItem, Avatar} from 'react-native-elements';
import deepDiffer from 'react-native/lib/deepDiffer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import textHandlers from './../../helpers/textHandlers';

import contactsStyles from './../../assets/styles/ContactsList'

import {ExpoLinksView} from '@expo/samples';

import fetchContactsList from '../../api/fetchContactsList';


export class ContactsList extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      layoutWidth: 0,
      layoutHeight: 0,
      orientation: 'landscape',
      isSavedContacts: props.isSavedContacts,
      contacts: {},
      refreshing: false,
      error: null,
      isFetching: true,
      updatesChecked: false
    };
  }

  onLayout(e) {
    const {width, height} = Dimensions.get('window')
    console.log(width, height);
    let orientation = '';

    if(width > height) {
      orientation = 'landscape'
    } else {
      orientation = 'portrait'
    }

    this.setState({
      layoutWidth: width,
      layoutHeight: height,
      orientation: orientation,
    })
  }

  _onRefresh() {
    if (!this.props.refreshTheList) {
      return;
    }

    this.props.refreshTheList = false;
    let that = this;

    this.setState({refreshing: true});

    fetchContactsList().then(function (response) {
      that.setState({
        refreshing: false,
        contacts: response.results
      });
    });
  }

  _onPress = (item) => {
    this.props.navigation.push("Profile", {
      user: item,
      checkUpdates: this.checkUpdates.bind(this),
      handleCheckedContactsInList: this.handleCheckedContactsInList.bind(this)
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  checkUpdates(updatesChecked) {

    this.props.checkUpdates(updatesChecked);
    this.setState({
      updatesChecked
    });
    this.forceUpdate()
  }

  capitalizeText = (string) => {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.props.refreshTheList !== prevProps.refreshTheList) {

      this._onRefresh();
      this.props.refreshTheList = false;

    }

    if (this.state.updatesChecked && deepDiffer(this.props, prevProps)) {

      this._isMounted = true;

      this.setState({
        contacts: this.props.savedContacts,
        updatesChecked: false
      })
    }
  }

  handleCheckedContactsInList(id) {
    let contacts = this.state.contacts;

    this.setState({
      isFetching: true
    })

    contacts.forEach((item) => {
      if (item.login.uuid === id) {
        item.bgColor = true;
      }
    });

    setTimeout(() => {
      this.setState({
        contacts,
        isFetching: false
      })
    }, 100);
  }

  componentWillMount() {
    this._isMounted = true;
    var that = this;

    if (this.state.isSavedContacts && this.props.savedContacts && this._isMounted) {
      console.log('response');
      console.log(this.props.savedContacts);

      this.setState({
        refreshing: false,
        contacts: this.props.savedContacts,
        isFetching: false
      });

    } else if (!this.state.isSavedContacts && this._isMounted) {

      fetchContactsList().then(function (response) {

        that.setState({
          refreshing: false,
          contacts: response.results,
          isFetching: false
        })

      }).catch(e => {
        console.log(e);
        this.setState({isFetching: false, error: e})
      });
      // container

    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderRow({item}, onPress) {
    let contact = item;
    let contactBg = '';
    let landscapeListStyle = '';


    if (contact.saved && this.props.navigation.state.routeName !== 'Home' && item.bgColor) {
      contactBg = {backgroundColor: '#bebebe'};
      contact.editable = true;
    }

    if (!contact.saved) {
      contact.editable = false;
    }

    if (this.state.layoutWidth > this.state.layoutHeight) {
      landscapeListStyle = {width: this.state.layoutWidth/2};
    }

    return (
      <TouchableOpacity onPress={() => onPress(contact)}
                        style={[contactBg, landscapeListStyle]}>
        <ListItem
          titleStyle={{ paddingEnd: 0, paddingStart: 1, textAlign: 'left', justifyContent: 'flex-end', alignItems: 'stretch'}}
          style={{
            paddingEnd: 0, paddingStart: 1
          }}
          key={contact.login.uuid}
          title={`${textHandlers.capitalizeText(contact.name.first)} ${textHandlers.capitalizeText(contact.name.last)}`}
          avatar={<Avatar large source={{uri: contact.picture.medium}}/>}
        />
      </TouchableOpacity>
    )
  }

  render() {

    let styles = contactsStyles;
    const {contacts, isFetching, error} = this.state;
    let columnsCount = 1;


    if (this.state.layoutWidth > this.state.layoutHeight) {
      columnsCount = 2;
    }

    if (isFetching) return <View><Text> Loading...</Text></View>;

    if (!contacts) return <View><Text> Loading...</Text></View>;

    if (contacts.length <= 0) return (
      <View style={styles.container}>
        <Text style={styles.emptyContactsText}>There is not saved contacts yet</Text>
      </View>);

    if (error) return <View><Text>{e.message}</Text></View>;

    return (
      <ScrollView
        style={styles.scrollView}>
        <View
          onLayout={this.onLayout.bind(this)}
          style={{flex: 1, position: 'relative'}}
        >
          <List>
            <FlatList
              style={{ flex: 1, position: 'relative'}}

              numColumns={columnsCount}
              key={columnsCount}
              data={contacts}
              renderItem={(item) => this.renderRow(item, this._onPress)}
              keyExtractor={item => item.login.uuid}
            />
          </List>
        </View>
      </ScrollView>
    );
  }

}