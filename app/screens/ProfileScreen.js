import React from 'react';
import {
  View,
  BackHandler,
  StatusBar,
  RefreshControl,
  Text, Dimensions
} from 'react-native';
import {NavigationActions, HeaderBackButton} from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderImageScrollView, {TriggeringView} from 'react-native-image-header-scroll-view';

import profileStyles from '../assets/styles/Profile';
import Profile from '../components/Profile/Profile';
import CustomImagePicker from '../components/CustomImagePicker';


export default class ProfileScreen extends React.Component {
  constructor(props) {

    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    let user = props.navigation.state.params.user;

    this.state = {
      refreshing: false,
      user: user,
      layoutWidth: 0,
      layoutHeight: 0,
      orientation: 'portrait',
      loading: true
    }
  }

  onLayout(e) {
    const {width, height} = Dimensions.get('window')
    console.log(width, height);
    let orientation = '';

    if(width > height) {
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

  render() {
    let user = this.state.user;
    let photo =  'http://www.sbsc.in/images/dummy-profile-pic.png';
    let widthOfLayout = this.state.layoutWidth;

    if(user) {
      photo =  user.picture.large;
    }

    if (this.state.loading) {
      return (<View style={profileStyles.container}><Text>Loading...</Text></View>);
    }

    return (

      <View style={profileStyles.container} onLayout={()=>this.onLayout()}>
        <StatusBar
          hidden={false}
          animated={true}
          barStyle={"dark-content"}
          backgroundColor={"#000"}
        />

        <CustomImagePicker setProfileImage={this.setProfileImage.bind(this)}/>

        <HeaderImageScrollView
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
                   goBack={this.handleBackButtonClick.bind(this)}/>

        </HeaderImageScrollView>

      </View>
    );
  }
}