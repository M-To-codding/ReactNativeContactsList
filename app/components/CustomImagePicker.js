import React from 'react';
import {Button, Image, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {ImagePicker} from 'expo';

export default class CustomImagePicker extends React.Component {
  state = {
    image: 'http://www.sbsc.in/images/dummy-profile-pic.png',
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log('resultCustomImagePicker');
    console.log(result);

    if (!result.cancelled) {
      this.setState({image: result.uri});
      this.props.setProfileImage(result.uri);
    }
  };


  render() {
    return (
      <View style={{
        height: 50,
        width: 50,
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 2,
        top: 30,
        right: 0
      }}>
        <Icon
          name="add-a-photo"
          color="#fff"
          onPress={this._pickImage.bind(this)}
        />
      </View>
    );
  }
}