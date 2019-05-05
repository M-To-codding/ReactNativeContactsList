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
import deepDiffer from 'react-native/lib/deepDiffer';

import {ExpoLinksView} from '@expo/samples';

import fetchContactsList from '../../api/fetchContactsList';


export class ContactsList extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      isSavedContacts: props.isSavedContacts,
      contacts: {},
      refreshing: false,
      error: null,
      isFetching: true,
      updatesChecked: false
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

    if (contact.saved && this.props.navigation.state.routeName !== 'Home' && item.bgColor) {
      contactStyle = {backgroundColor: '#bebebe'};
      contact.editable = true;
    }

    if (!contact.saved) {
      contact.editable = false;
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

    if (contacts.length <= 0) return (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: '#bebebe', fontWeight: 'bold'}}>There is not saved contacts yet</Text>
    </View>);

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