import React from 'react';
import {ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {ExpoLinksView} from '@expo/samples';

import fetchContactsList from '../../api/fetchContactsList';


export class ContactsList extends React.Component {
  constructor(props) {
    // let data = fetchContactsList().then(function(response) {
    //   console.log('contacts: ' + response)
    // });
    // console.log('contacts: ' + fetchContactsList())
    super(props);

    this.state = {
      contacts: null
    };
  }

  componentWillMount() {
    var that = this;

    fetchContactsList().then(function (response) {
      console.log('contacts');
      console.log(response);

      that.setState({
        contacts: response.results
      })
    })
  }

  _onPress() {
    console.log('Hello world!')
  }

  render() {
    let contacts = this.state.contacts;

    console.log('contacts: ');
    console.log(this.state.contacts);

    if (contacts) {

      const contactsList = contacts.map((val) => {
        return (
          <ScrollView key={val.login.uuid}>
            <TouchableOpacity onPress={this._onPress}>
              <Image
                style={{width: 200, height: 200}}
                source={{uri: val.picture.large}}
              />
              <Text>{val.name.first}</Text>
              <Text>{val.name.last}</Text>
              <Text>{val.gender}</Text>
            </TouchableOpacity>
          </ScrollView>
        )

      });

      return (
        <ScrollView>
          <View>
            <TouchableOpacity onPress={this._onPress}>
              {contactsList}
            </TouchableOpacity>
          </View>
        </ScrollView>
      );

    } else {
      return <View><Text> Loading...</Text></View>;
    }

  }
}