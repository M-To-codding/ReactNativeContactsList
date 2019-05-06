import React from 'react';
import {Image, Linking, TouchableOpacity, View, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import deepDiffer from 'react-native/lib/deepDiffer'

import buttonsStyles from "../assets/styles/ProfileButtons";
import profileStyles from "../assets/styles/Profile";


export default class FloatingAddContactButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldUpdate: false
    }
  }

  clickHandler = () => {
    let emptyUser = {};

    this.props.navigation.push("Profile", {
      user: null,
      isNewContact:this.props.isNewContact,
      checkUpdates: this.props.checkUpdates,
    });
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={this.clickHandler}
        style={[styles.TouchableOpacityStyle]}>
        <Icon
          name="add"
          color={'#fff'}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    alignSelf: 'flex-end',
    backgroundColor: '#000',
    overflow: 'hidden',
    borderRadius: 100
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    color: '#fff'
    //backgroundColor:'black'
  },
});