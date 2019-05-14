import React, {Component} from 'react';
import {TextInput, Text, View, Keyboard} from 'react-native';
import {Constants, Notifications, Permissions} from 'expo';

import fetchNotification from "../../api/fetchNotification";
import getAppSettings from "../../actions/getAppSettings";

export default class LocalNotifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isEnabled: true,
      sendNotification: false,
      notificationSended: false,
      timer: 10000
    }

    this.notificationInterval = '';

    this.getNotificationPermissions();
  }

  async getNotificationPermissions() {
    await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
    await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }

  getNotificationsSettings() {

    let notificationDelay = this.state.timer;
    let notificationEnabled = this.state.isEnabled;
    let data = {};
    let that = this;

    getAppSettings().then((response) => {
      if (response) {
        console.log('getNotificationsSettings')
        console.log(response)
        data = JSON.parse(response)
        notificationDelay = data.notifications.notificationsDelay.selectedCount * 10000
        notificationEnabled = data.notifications.isShown;

        if(that.state.isEnabled !== notificationEnabled) {
          Notifications.cancelAllScheduledNotificationsAsync();
        }

        that.setState({
          isEnabled: notificationEnabled,
          timer: notificationDelay
        })

        console.log('getNotificationsSettings')
        console.log(this.state)
        if (notificationEnabled) {
          this.sendNotification();
        } else {
          Notifications.cancelAllScheduledNotificationsAsync();
        }

        return data;
      }
    })
  }

  sendNotification() {
    if (!this.state.isEnabled) {
      return
    }
    Keyboard.dismiss();

    let localNotification = null;

    fetchNotification().then((response) => {
      console.log('fetchNotification')
      console.log(response)
      if (response) {
        localNotification = {
          title: response.source,
          body: response.text,
          android: {
            sound: true,
            vibrate: [0, 250, 250, 250],
            priority: 'high',
          },
          ios: {
            sound: true,
            vibrate: [0, 250, 250, 250],
            priority: 'high',
          },
        };

        let time = (new Date()).getTime();
        time += this.state.timer;

        // if(!this.state.notificationSended) {
        //   time = 10000
        //   this.setState({
        //     notificationSended: true
        //   })
        // }

        const schedulingOptions = {
          time: time
        }

        Notifications.scheduleLocalNotificationAsync(
          localNotification, schedulingOptions
        );
      }
    })
  }

  handleNotification() {
    console.warn('ok! got your notif');
    this.sendNotification()
  }

  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.')
    }

    Notifications.addListener(this.handleNotification.bind(this));

    if (this.state.loading) {

      this.getNotificationsSettings();

      if (!this.state.isEnabled) {
        Notifications.cancelAllScheduledNotificationsAsync();
      }

      this.setState({
        loading: false
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdateNotification')
    // if (this.state.loading) {
    //
    //   this.getNotificationsSettings();
    //
    //   this.setState({
    //     loading: false
    //   })
    // }
  }

  async componentWillUnmount() {
    this.setState({
      sendNotification: false
    })
    Notifications.cancelAllScheduledNotificationsAsync();
  }

  render() {

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      </View>
    );
  }
};