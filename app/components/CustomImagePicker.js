import React from 'react';
import {Button, Image, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {ImagePicker, Permissions} from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class CustomImagePicker extends React.Component {
  state = {
    image: 'http://www.sbsc.in/images/dummy-profile-pic.png',
    hasCameraPermission: null,
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({image: result.uri});
      this.props.setProfileImage(result.uri);

      this.props.openLauncher(false, null, null);
    }
  };

  openCamera = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({hasCameraPermission: status === 'granted'});

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({image: result.uri});
      this.props.setProfileImage(result.uri);

      this.props.openLauncher(false, null, null);
    }
  };

  async componentDidMount() {
  }

  openLauncher() {
    this.props.openLauncher(true, this._pickImage, this.openCamera);
  }

  render() {
    let style = {
      height: 50,
      width: 50,
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 2,
      top: 30,
      right: 0
    }

    if (this.props.isHorizontal) {
      style = {
        height: 50,
        width: 50,
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 2,
        top: 30,
        left: wp('55%')
      }
    }

    return (
      <View style={style}>
        <Icon
          name="add-a-photo"
          color="#fff"
          onPress={this.openLauncher.bind(this)}
        />
      </View>
    );
  }
}