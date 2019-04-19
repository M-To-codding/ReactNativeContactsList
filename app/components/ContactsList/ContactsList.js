import React from 'react';
import {ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button} from 'react-native';
import {List, ListItem, Avatar} from 'react-native-elements';

import {ExpoLinksView} from '@expo/samples';

import fetchContactsList from '../../api/fetchContactsList';


export class ContactsList extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      isHome: props.isHome,
      contacts: {},
      refresh: false,
      error: null,
      isFetching: true
    };
  }

  _onPress = (item) => {
    let that = this;
    this.props.navigation.push("Profile", {
      user: item,
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillMount() {
    this._isMounted = true;
    var that = this;

    if (this.state.isHome && this.props.savedContacts &&  this._isMounted) {

      this.setState({
        contacts: this.props.savedContacts,
        isFetching: false
      });

    } else if (!this.state.isHome &&  this._isMounted) {

      fetchContactsList().then(function (response) {

        that.setState({
          contacts: response.results,
          isFetching: false
        })

      }).catch(e => {
        console.log(e);
        this.setState({isFetching: false, error: e})
      });

    }
  }

  componentWillReceiveProps(nextProps, nextContext) {

    if (this.state.isHome) {
      this.setState({
        contacts: nextProps.savedContacts,
        isFetching: false
      })
    }

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderRow({item}, onPress) {
    let contact = item;

    return (
      <TouchableOpacity onPress={() => onPress(contact)}>
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
      <ScrollView style={{width: '100%'}}>
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