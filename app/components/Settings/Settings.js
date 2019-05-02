import React from 'react';

import settings from './../../data/settings'
import {FlatList, ScrollView, TouchableOpacity, View, Text, Picker, Switch} from "react-native";
import {Avatar, List, ListItem} from "react-native-elements";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

import profileStyles from '../../assets/styles/Profile';


export default class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      settings: settings,
      selectedCount: '10 users',
      selectedTime: '30',
      allowPushNotifications: false,
    }
  }

  static navigationOptions = ({
    header: null,
  });


  _onPress(settingItem) {

  }

  renderRows(onPress) {
    let recommended = this.state.settings.recommended.count;
    let notifications = this.state.settings.notifications;
    let system = this.state.settings;

    return (
      <View onPress={() => onPress(recommended)}
            key={recommended.key}>

        <View style={{backgroundColor: '#f6f6f6', flex: 1}}>
          <View>
            <Text>
              Recommended
            </Text>
          </View>

          <View>
            <Text>
              Recomended count
            </Text>
            <Picker
              selectedValue={this.state.selectedCount}
              mode="dialog"
              style={[
                {
                  flex: 1,
                  height: 20,
                  width: wp('45%'),
                  borderBottomWidth: 1,
                  borderColor: '#c1c1c1',
                  transform: ([{ scale: 0.8 }]),
                  justifyContent: 'flex-end',
                  paddingHorizontal: 0,
                  marginLeft: -20
                }]}
              itemStyle={{
                borderTopWidth: 1,
                borderTopColor: '#000',
                borderBottomWidth: 1,
                borderBottomColor: '#000',
                justifyContent: 'flex-end'
              }}
              onValueChange={(selectedCount, itemIndex) =>
                this.setState({selectedCount: selectedCount})
              }>
              {recommended.map((item, index) => {
                  return (<Picker.Item key={`pickerItem-${index}`} label={item} value={item}/>);
                }
              )}
            </Picker>
          </View>

          <View>
            <Text>
              Notifications
            </Text>
          </View>

          <View>
            <Text>
              Show notifications
            </Text>
            <Switch title="Show notifications" onValueChange={()=>this.setState({allowPushNotifications: !this.state.allowPushNotifications})} value={this.state.allowPushNotifications}/>
          </View>

          <View>
            <Text>
              Notification delay
            </Text>
          </View>

          <View>
            <Text>
             System
            </Text>
            <Text>
             Language
            </Text>
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
