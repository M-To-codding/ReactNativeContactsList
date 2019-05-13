import React, {Component} from 'react';
import {TextInput, Text, View, Keyboard} from 'react-native';
import {Constants, Notifications, Permissions} from 'expo';

import fetchNotification from "../../api/fetchNotification";

export default class LocalNotifications extends Component {
  constructor(props) {
    super(props);

    setInterval(()=>{
      this.onSubmit()
    }, 15000)
  }


  onSubmit(e) {
    Keyboard.dismiss();

    let localNotification = null;

    fetchNotification().then((response) => {
      console.log('fetchNotification')
      console.log(response)
      if (response) {
        return localNotification = {
          title: response.source,
          body: response.text
        };

        const schedulingOptions = {
          time: (new Date()).getTime() + 15000,
          repeat: 'minute'
        }

        Notifications.scheduleLocalNotificationAsync(
          localNotification, schedulingOptions
        );
      }
    })
  }

  handleNotification() {
    console.warn('ok! got your notif');
  }

  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.')
    }

    Notifications.addListener(this.handleNotification);
  }

  render() {

    this.onSubmit();

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      </View>
    );
  }
};