import React from 'react';
import {ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button} from 'react-native';
import {List, ListItem, Avatar} from 'react-native-elements';

import {ExpoLinksView} from '@expo/samples';

import fetchContactsList from '../../api/fetchContactsList';


export class ContactsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: {},
      refresh: false,
      error: null,
      isFetching: true
    };
  }

  _onPress = (item) => {
    this.props.navigation.push("Profile", {
      user: item
    });
  }


  componentWillMount() {
    var that = this;

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
    console.log('Contacts')
    console.log(this.state.contacts)
    const {contacts, isFetching, error} = this.state;


    if (isFetching) return <View><Text> Loading...</Text></View>;

    if (error) return <div>{`Error: ${e.message}`}</div>;

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