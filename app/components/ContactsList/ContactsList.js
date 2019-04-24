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
  RefreshControl
} from 'react-native';
import {List, ListItem, Avatar} from 'react-native-elements';

import {ExpoLinksView} from '@expo/samples';

import fetchContactsList from '../../api/fetchContactsList';


export class ContactsList extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    console.log(this.props.navigation)

    this.state = {
      isSavedContacts: props.isSavedContacts,
      contacts: {},
      refreshing: false,
      error: null,
      isFetching: true
    };
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
      checkUpdates: this.checkUpdates.bind(this)
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  checkUpdates(updated) {
    console.log('checkUpdates')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    console.log('componentWillUpdate')
    if (this.props.refreshTheList !== prevProps.refreshTheList) {
      this._onRefresh();
      this.props.refreshTheList = false;

    }
  }

  checkSavedContacts() {

  }

  componentWillMount() {
    this._isMounted = true;
    var that = this;

    if (this.state.isSavedContacts && this.props.savedContacts && this._isMounted) {

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

    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderRow({item}, onPress) {
    let contact = item;
    let contactStyle = '';

    if (contact.saved && this.props.navigation.state.routeName) {
      contactStyle = {backgroundColor: '#aaa'}
    }

    return (
      <TouchableOpacity onPress={() => onPress(contact)}
                        style={contactStyle}>
        <ListItem
          key={contact.login.uuid}
          title={`${contact.name.first} ${contact.name.last}, dsfddfsasss`}
          avatar={<Avatar large source={{uri: contact.picture.medium}}/>}
        />
      </TouchableOpacity>
    )
  }

  render() {

    const {contacts, isFetching, error} = this.state;

    if (isFetching) return <View><Text> Loading...</Text></View>;

    if (error) return <View><Text>{e.message}</Text></View>;

    return (
      <ScrollView
        style={{width: '100%'}}>
        <View>
          <List>
            <FlatList
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