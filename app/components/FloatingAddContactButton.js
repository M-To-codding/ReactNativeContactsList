import React from 'react';
import {Image, Linking, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import deepDiffer from 'react-native/lib/deepDiffer'

import buttonsStyles from "../assets/styles/ProfileButtons";


export default class FloatingAddContactButton extends React.Component {

  render() {

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
        <TouchableOpacity style={{
          position: 'absolute',
          width: 150,
          height: 40,
          borderRadius: 20,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 30,
        }}>
          <Icon
            name='add'
            color='#fff'
            style={{resizeMode: 'contain',}}
          />
        </TouchableOpacity>
      </View>
    );
  }

}