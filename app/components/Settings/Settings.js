import React from 'react';

import settings from './../../data/settings'
import {FlatList, ScrollView, TouchableOpacity, View, Text, Picker} from "react-native";
import {Avatar, List, ListItem} from "react-native-elements";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import SettingsList from 'react-native-settings-list';

import profileStyles from '../../assets/styles/Profile';


export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      settings: settings,
      selectedCount: 10,
      selectedTime: 30,
      allowPushNotifications: false,
    }
  }

  static navigationOptions = {
    header: null
  };

  _onPress(settingItem) {

  }

  renderRows(onPress) {
    let recommended = this.state.settings.recommended;
    let notifications = this.state.settings.notifications;
    let system = this.state.settings;


    return (
      <View onPress={() => onPress(recommended)}
            key={recommended.key}>

        <View style={{borderBottomWidth: 1, backgroundColor: '#263238', borderColor: '#c8c7cc'}}>
          <Text style={{
            color: 'white',
            marginTop: 15,
            marginBottom: 15,
            marginLeft: 15,
            fontWeight: 'bold',
            fontSize: 20
          }}>Settings</Text>
        </View>

        <View style={{backgroundColor: '#f6f6f6', flex: 1}}>
          <SettingsList borderColor='#d6d5d9' defaultItemSize={50}>

            <SettingsList.Header headerText={recommended.title}/>
            <SettingsList.Item title={recommended.text || 'Empty data'} hasSwitch={true} switchProps={{count: 0, count2: 2}}/>

            {/*<SettingsDividerLong android={true}/>*/}

            <Picker
              selectedValue={`${this.state.selectedCount} users`}
              style={[
                profileStyles.textInput,
                {
                  height: 50,
                  width: wp('48%'),
                  borderBottomWidth: 1,
                  borderColor: '#c1c1c1',
                }]}
              itemStyle={{
                borderTopWidth: 1,
                borderTopColor: '#000',
                borderBottomWidth: 1,
                borderBottomColor: '#000'
              }}
              onValueChange={(selectedCount, itemIndex) =>
                this.setState({selectedCount: selectedCount})
              }>
              {/*<Picker.Item label={recommended.count} value={recommended.count}/>*/}
            </Picker>
          </SettingsList>
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
