import React from 'react';
import {
  View,
  BackHandler,
  StatusBar,
  RefreshControl,
  Text, Dimensions,
  Image, TouchableOpacity, TouchableHighlight
} from 'react-native';
import {NavigationActions, HeaderBackButton} from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';

import profileStyles from '../assets/styles/Profile';
import Profile from '../components/Profile/Profile';
import CustomImagePicker from '../components/CustomImagePicker';
import {Avatar} from "react-native-elements";


let userData = {
  name: {
    first: '',
    last: '',
  },
  gender: 'mail',
  dob: {
    date: ''
  },
  phone: '',
  picture: {
    large: 'http://www.sbsc.in/images/dummy-profile-pic.png',
    medium: 'http://www.sbsc.in/images/dummy-profile-pic.png'
  },
  email: '',
  login: {
    uuid: ''
  },
  saved: true,
  isNewContact: true
}

export default class ProfileScreen extends React.Component {
  constructor(props) {

    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    let user = props.navigation.state.params.user || userData;

    this.launcherHandler.bind(this);

    this.state = {
      refreshing: false,
      user: user,
      layoutWidth: 0,
      layoutHeight: 0,
      orientation: 'portrait',
      showLauncher: false,
      loading: true,
      openGallery: null,
      openCamera: null
    }
  }

  onLayout(e) {
    const {width, height} = Dimensions.get('window')
    console.log(width, height);
    let orientation = '';

    if (width > height) {
      orientation = 'landscape'
    } else {
      orientation = 'portrait'
    }

    this.setState({
      layoutWidth: width,
      layoutHeight: height,
      orientation: orientation,
    })
  }

  checkUser(user) {
    this.setState({
      saved: user.saved
    })
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

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.setState({
      loading: false
    })
  }

  handleBackButtonClick(isDataChanged) {
    if (this.state.showLauncher) {
      this.setState({
        showLauncher: false
      });
      return;
    }

    if (isDataChanged) {
      this.forceUpdate();
    }
    this.props.navigation.goBack(null);
    return true;
  }

  setProfileImage(uri) {
    let user = this.state.user;
    let picture = {
      large: uri,
      medium: uri,
    }

    user.picture = picture;

    this.setState({
      user
      // loading: true
    })
  }

  launcherHandler(isShowed, openGallery, openCamera) {
    console.log('isShowed')
    console.log(isShowed)
    if (isShowed) {
      this.setState({
        showLauncher: true,
        openGallery: openGallery,
        openCamera: openCamera
      })
    } else {
      this.setState({
        showLauncher: false,
        openGallery: null,
        openCamera: null
      })
    }

  }

  render() {
    let user = this.state.user;
    let photo = 'http://www.sbsc.in/images/dummy-profile-pic.png';
    let widthOfLayout = this.state.layoutWidth;
    let launcher = null;
    let isHorizontal = this.state.orientation === 'landscape' ? true : false

    if (user) {
      photo = user.picture.large;
    }

    if (this.state.loading) {
      return (<View style={profileStyles.container}><Text>Loading...</Text></View>);
    }

    if (this.state.showLauncher) {
      launcher = <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'flex-end',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 2
        }}
      >

        <TouchableHighlight
          activeOpacity={0}
          style={{
            flex: 1,
            height: hp('50%'),
            width: wp('100%'),
            opacity: 0
          }}
          onPress={() => {
            this.launcherHandler(false);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          bottom: 0,
          paddingVertical: 80,
          paddingHorizontal: 40,
          width: wp('100%')
        }}>

          <View style={{
            height: 1,
            width: wp('100%'),
            backgroundColor: '#f1f1f1',
          }}/>

          <TouchableOpacity
            style={{
              paddingVertical: 20,
              textAlign: 'center',
              width: wp('100%')
            }}
            onPress={this.state.openGallery ? () => this.state.openGallery() : undefined}>
            <Text style={{textAlign: 'center',}}>Gallery</Text>
          </TouchableOpacity>

          <View style={{
            height: 1,
            width: wp('100%'),
            backgroundColor: '#f1f1f1',
          }}/>

          <TouchableOpacity
            style={{
              paddingVertical: 20,
              width: wp('100%')
            }}
            onPress={this.state.openCamera ? () => this.state.openCamera() : undefined}>
            <Text style={{textAlign: 'center',}}>Camera</Text>
          </TouchableOpacity>

          <View style={{
            height: 1,
            width: wp('100%'),
            backgroundColor: '#f1f1f1',
          }}/>
        </View>
      </View>
    }

    let mainContent = <HeaderImageScrollView
      onDisplay={this.onLayout.bind(this)}
      maxHeight={250}
      minHeight={75}
      disableHeaderGrow={false}
      bounces={true}
      width={widthOfLayout}
      overlayColor="#2b2b2b"
      maxOverlayOpacity={0.95}
      minOverlayOpacity={0.3}
      fadeOutForeground={true}
      foregroundParallaxRatio={2}
      headerImage={{uri: photo}}
      scrollViewBackgroundColor="#fff">

      <Profile {...this.props} profileStyles={profileStyles} layoutWidth={widthOfLayout} user={this.state.user}
               goBack={this.handleBackButtonClick.bind(this)} isHorizontal={isHorizontal}/>

    </HeaderImageScrollView>;


    if (this.state.orientation === 'landscape') {
      mainContent = <View
        onLayout={this.onLayout.bind(this)} style={{flex: 1, flexDirection: 'row'}}>

        <Image
          source={{uri: photo}}
          style={{height: this.state.layoutHeight, width: this.state.layoutWidth / 2.5}}
        />

        <Profile {...this.props} profileStyles={profileStyles} layoutWidth={widthOfLayout} user={this.state.user}
                 goBack={this.handleBackButtonClick.bind(this)} isHorizontal={isHorizontal}/>

      </View>
    }

    return (

      <View style={profileStyles.container} onLayout={() => this.onLayout()}>

        <StatusBar
          hidden={false}
          animated={true}
          barStyle={"dark-content"}
          backgroundColor={"#000"}
        />

        <CustomImagePicker setProfileImage={this.setProfileImage.bind(this)}
                           openLauncher={this.launcherHandler.bind(this)} isHorizontal={isHorizontal}/>

        {mainContent}
        {launcher}
      </View>
    );
  }
}