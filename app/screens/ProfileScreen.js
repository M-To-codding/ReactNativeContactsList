import React from 'react';
import {ExpoConfigView} from '@expo/samples';
import {
  View,
  Text,
  Button,
  BackHandler,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  TextInput,
  Picker,
  TouchableHighlight,
  Linking
} from 'react-native';
import {Avatar, Header, Icon, List} from 'react-native-elements';
import {NavigationActions, HeaderBackButton} from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';
import DatePicker from 'react-native-datepicker';

import profileStyles from '../assets/styles/Profile';
import storeData from '../actions/storeDataInAsyncStorage';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    console.log('Hello world!');
    console.log(props);

    let user = props.navigation.state.params.user;

    this.state = {
      user: user,
      refreshing: false,
      name: user.name.first,
      lastName: user.name.last,
      gender: user.gender,
      date: user.dob.date,
      phone: user.phone,
      email: user.email
    }
  }

  _onRefresh() {
    this.setState({
      refreshing: true,
    });

    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 2000);
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "",
      headerLeft: <HeaderBackButton tintColor="white" onPress={() => navigation.goBack(null)}/>,
      headerTransparent: true,
      headerStyle: {
        borderBottomWidth: 0,
        paddingTop: 0,
        marginTop: 0,
        height: 30
      }
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({title: "Profile"})
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  saveContact(contact){
    storeData(contact);
  }

   handleProfileButtons() {
    const buttons =
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: wp('100%'),
          backgroundColor: '#000',
          height: 100,
          marginLeft: -10,
          marginRight: -10,
          marginBottom: 25
        }}>
          <TouchableOpacity style={profileStyles.button} onPress={()=>Linking.openURL(`tel:${this.state.phone}`)}>
            <Image
              source={{uri: 'https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/phone-icon-18-256.png'}}
              style={{width: 30, height: 30}}/>
          </TouchableOpacity>

          <TouchableOpacity style={profileStyles.button} onPress={()=>Linking.openURL('mailto:support@example.com')}>
            <Image source={{uri: 'https://cdn.pixabay.com/photo/2013/04/01/21/31/mail-99218_640.png'}}
                   style={{width: 30, height: 30}}/>
          </TouchableOpacity>

          <TouchableOpacity style={profileStyles.button} onPress={()=>this.saveContact(this.state.user)}>
            <Image
              source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbUYw0HQJzifmBIw49AqI5y82JUnP8EZKt2Pw0eE_at-vRJ4YRDg'}}
              style={{width: 30, height: 30}}/>
          </TouchableOpacity>
        </View>;

    return buttons;
  }

  render() {

    const profileButtons = this.handleProfileButtons();

    return (

      <View style={profileStyles.container}>
        <StatusBar
          hidden={false}
          animated={true}
          barStyle={"dark-content"}
          backgroundColor={"#000"}
        />

        <HeaderImageScrollView
          maxHeight={250}
          minHeight={75}
          disableHeaderGrow={false}
          bounces={true}
          overlayColor="#2b2b2b"
          style={{width: wp("100%")}}
          maxOverlayOpacity={0.95}
          minOverlayOpacity={0.3}
          fadeOutForeground={true}
          foregroundParallaxRatio={2}
          headerImage={{uri: this.state.user.picture.large}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="white"
            />
          }
          scrollViewBackgroundColor="#fff">

          <View style={[profileStyles.detailsContainer, {minHeight: hp('83%')}]}>
            <TriggeringView onHide={() => console.log("text hidden")}>

              {profileButtons}

              <View>
                <Text style={profileStyles.labelStyle}>Name</Text>
                <TextInput
                  label="Name"
                  style={profileStyles.textInput}
                  onChangeText={(name) => this.setState({name})}
                  underlineColorAndroid={"#c1c1c1"}
                  value={this.state.name}
                  shake={true}
                />
              </View>

              <View>
                <Text style={profileStyles.labelStyle}>Surname</Text>
                <TextInput
                  style={profileStyles.textInput}
                  label="Surname"
                  onChangeText={(lastName) => this.setState({lastName})}
                  underlineColorAndroid={"#c1c1c1"}
                  value={this.state.lastName}
                  shake={true}
                />
              </View>

              <View style={{flexDirection: "row"}}>
                <View>
                  <Picker
                    selectedValue={this.state.gender}
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
                    underlineColorAndroid={'#c1c1c1'}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({gender: itemValue})
                    }>
                    <Picker.Item label={this.state.gender} value={this.state.gender}/>
                    <Picker.Item label={this.state.gender === 'female' ? 'male' : 'female'}
                                 value={this.state.gender === 'female' ? 'male' : 'female'}/>
                  </Picker>

                  {/*Some solution for android picker border style*/}
                  <View style={{
                    height: 1,
                    width: wp('48%'),
                    borderBottomWidth: 1,
                    borderColor: '#c1c1c1',
                    marginTop: -21,
                    marginBottom: 21
                  }}/>
                  {/**/}

                </View>

                <View>
                  <Text style={profileStyles.labelStyle}>Birthday: </Text>
                  <DatePicker
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
                      dateInput: [profileStyles.textInput, {
                        border: 0,
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        borderColor: '#c1c1c1',
                        alignItems: 'stretch',
                        justifyContent: 'flex-end',
                        width: wp('48%'),
                      }],
                    }}
                    onDateChange={(date) => {
                      this.setState({date: date})
                    }}
                  />
                </View>
              </View>

              <View>
                <Text style={profileStyles.labelStyle}>Phone: </Text>
                <TextInput
                  style={profileStyles.textInput}
                  onChangeText={(phone) => this.setState({phone})}
                  underlineColorAndroid={'#c1c1c1'}
                  value={this.state.phone}
                  shake={true}
                />
              </View>

              <View>
                <Text style={profileStyles.labelStyle}>E-mail: </Text>
                <TextInput
                  style={profileStyles.textInput}
                  onChangeText={(email) => this.setState({email})}
                  underlineColorAndroid={'#c1c1c1'}
                  value={this.state.email}
                  shake={true}
                />
              </View>
            </TriggeringView>
          </View>

        </HeaderImageScrollView>

      </View>
    );
  }
}