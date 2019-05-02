import React from 'react';

import {FlatList, ScrollView, TouchableOpacity, View, Text, Picker, Switch} from "react-native";
import {Avatar, List, ListItem, Icon} from "react-native-elements";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

import settings from './../../data/settings';
import getAppSettings from './../../actions/getAppSettings';
import setAppSettings from './../../actions/setAppSettings';

import profileStyles from '../../assets/styles/Profile';


export default class Settings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      settings: {},
      isFetching: true,
    }
  }

  static navigationOptions = ({
    header: null,
  });

  getSettings() {
    const that = this;

    getAppSettings().then((response) => {
      console.log('response');
      console.log(response);

      if (response) {
        that.setState({
          settings: JSON.parse(response),
          isFetching: false
        })
      }
    })
  }

  componentDidMount() {
    this.getSettings();
  }

  setRecommendedCount(count) {
    let settings = {...this.state.settings};
    settings.recommended.selectedCount = count;
    console.log('recommended.selectedCount');
    console.log(settings);

    this.setState({
      settings,
      isFetching: true
    });

    setTimeout(() => {
      setAppSettings(this.state.settings);
      this.getSettings();
    }, 50)
  }

  setNotificationsDelay(delay) {

  }

  showNotifications(isShown) {
    const settings = {...this.state.settings};
    settings.notifications.isShown = !isShown;

    this.setState({
      settings,
      isFetching: true
    });

    setTimeout(() => {
      setAppSettings(this.state.settings);
      this.getSettings();
    }, 50)
  }

  _onPress(settingItem) {
    setAppSettings(this.state.settings);
  }

  renderRows(onPress) {
    if (this.state.isFetching) {
      return <Text> </Text>
    }


    let recommended = this.state.settings.recommended;
    let notifications = this.state.settings.notifications;
    console.log('settings')
    console.log(recommended.selectedCount)

    return (
      <View>

        <View style={{flex: 1, padding: 20}}>

          <View>
            <Text style={{color: '#979797'}}>
              Recommended
            </Text>
          </View>

          <View style={{paddingVertical: 20, flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
              <Icon name="group-add"/>
            </View>

            <View style={{width: wp('70%')}}>
              <Text>
                Recommended count
              </Text>

              <Picker
                selectedValue={recommended.selectedCount}
                mode="dialog"
                style={[
                  {
                    flex: 1,
                    height: 20,
                    width: wp('35%'),
                    // color: '#979797',
                    color: 'transparent',
                    opacity: 0,
                    // transform: ([{scale: 0.8}]),
                    justifyContent: 'flex-end',
                    marginLeft: -20
                  }]}
                itemStyle={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onValueChange={(selectedCount, itemIndex) => this.setRecommendedCount(selectedCount)}>
                {recommended.count.map((item, index) => {
                    return (<Picker.Item key={`pickerItem-${index}`} label={item} value={item}/>);
                  }
                )}
              </Picker>

              <Text style={{
                color: '#979797',
                position: 'absolute',
                top: 20,
                fontSize: 12
              }}> {recommended.selectedCount + ' users'}</Text>

            </View>
          </View>


          <View style={{borderBottomWidth: 1, borderColor: '#e6e6e6'}}/>


          <View style={{flex: 1, paddingVertical: 20}}>
            <Text style={{color: '#979797'}}>
              Notifications
            </Text>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
              <Icon name="notifications"/>
            </View>

            <View style={{width: wp('70%'), flexDirection: 'row', alignItems: 'center'}}>
              <Text>
                Show notifications
              </Text>

              <Switch
                style={{marginLeft: 20}}
                label="Show notifications"
                onValueChange={() => {
                  this.showNotifications(notifications.isShown)
                }}
                value={notifications.isShown}/>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
              <Icon name="notifications-paused"/>
            </View>

            <View style={{width: wp('70%'), flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{paddingVertical: 20}}>
                Notification delay
              </Text>
            </View>
          </View>

          <View style={{borderBottomWidth: 1, borderColor: '#e6e6e6'}}/>

          <View style={{flex: 1, paddingVertical: 20}}>
            <Text style={{color: '#979797'}}>
              System
            </Text>
          </View>

          <View style={{paddingVertical: 20, flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
              <Icon name="language"/>
            </View>

            <View style={{width: wp('70%'), flexDirection: 'row', alignItems: 'center'}}>
              <Text>
                Language
              </Text>
            </View>
          </View>

        </View>
      </View>
    )
  }

  render() {
    const settingsLayout = this.renderRows();

    return (
      <ScrollView
        style={{width: '100%'}}>
        <View>
          <List>
            {settingsLayout}
          </List>
        </View>
      </ScrollView>
    )
  }
}
