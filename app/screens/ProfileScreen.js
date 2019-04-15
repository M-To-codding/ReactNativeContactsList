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
  Picker
} from 'react-native';
import {Avatar, Header, Icon, List} from 'react-native-elements';
import {NavigationActions, HeaderBackButton} from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';
import DatePicker from 'react-native-datepicker';


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    console.log('Hello world!');
    console.log(props);

    let user = props.navigation.state.params.user

    this.state = {
      user: user,
      refreshing: false,
      name: user.name.first,
      lastName: user.name.last,
      gender: user.gender,
      date: user.dob.date
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

  render() {
    return (

      <View style={style.container}>
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
          overlayColor="#2b2b2b"
          style={{width: wp("100%")}}
          maxOverlayOpacity={0.95}
          minOverlayOpacity={0.3}
          fadeOutForeground
          headerImage={{uri: this.state.user.picture.large}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="white"
            />
          }
          scrollViewBackgroundColor="#fff">

          <View style={[style.detailsContainer, {minHeight: hp('83%')}]}>
            <TriggeringView onHide={() => console.log("text hidden")}>
              <Text>Name: </Text>
              <TextInput
                style={{height: 40, paddingHorizontal: 10}}
                onChangeText={(name) => this.setState({name})}
                underlineColorAndroid={'#c1c1c1'}
                value={this.state.name}
                shake={true}
              />
              <Text>Surname: </Text>
              <TextInput
                style={{height: 40, paddingHorizontal: 10}}
                onChangeText={(lastName) => this.setState({lastName})}
                underlineColorAndroid={'#c1c1c1'}
                value={this.state.lastName}
                shake={true}
              />

              <Picker
                selectedValue={this.state.gender}
                style={{height: 50, width: 100, borderBottomColor: '#c1c1c1', borderBottomWidth: 1}}
                underlineColorAndroid={'#c1c1c1'}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({gender: itemValue})
                }>
                <Picker.Item label={this.state.gender} value={this.state.gender}/>
                <Picker.Item label={this.state.gender === 'female' ? 'male' : 'female'}
                             value={this.state.gender === 'female' ? 'male' : 'female'}/>
              </Picker>

              <Text>Birthday: </Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    display:'none',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    border: 0,
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderColor: '#c1c1c1',
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => {this.setState({date: date})}}
              />

              <Text>{this.state.user.dob.date}</Text>
              <Text>Phone: </Text>
              <Text>{this.state.user.phone}</Text>
              <Text>E-mail: </Text>
              <Text>{this.state.user.email}</Text>
            </TriggeringView>
          </View>

        </HeaderImageScrollView>

      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
    marginTop: 300
  },
  buttonsPanel: {
    backgroundColor: '#b6d4ff'
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    resizeMode: 'cover',
  },
  detailsContainer: {
    paddingHorizontal: 10
  }
});