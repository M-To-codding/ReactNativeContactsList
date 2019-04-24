import React from 'react';
import {
  View,
  BackHandler,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {NavigationActions, HeaderBackButton} from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';

import profileStyles from '../assets/styles/Profile';
import Profile from '../components/Profile/Profile';


export default class ProfileScreen extends React.Component {
  constructor(props) {

    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    let user = props.navigation.state.params.user;

    this.state = {
      refreshing: false,
      user: user
    }
  }

  checkUser(user){
    this.setState({
      saved: user.saved
    })
  }

  _onRefresh() {
    this.setState({
      refreshing: true,
    });

    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 1000);
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

          <Profile {...this.props} profileStyles={profileStyles} user={this.state.user} goBack={this.handleBackButtonClick.bind(this)}/>

        </HeaderImageScrollView>

      </View>
    );
  }
}