import React from "react";
import {Picker, Text, TextInput, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderImageScrollView, {TriggeringView} from "react-native-image-header-scroll-view";
import DatePicker from "react-native-datepicker";


import {setData} from "../data/buttons";
import inputStyles from "../assets/styles/Inputs";


export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.label,
      textData: props.textData
    }
  }

  render() {

    return (
      <View>
        <Text style={inputStyles.labelStyle}>{this.state.label}</Text>
        <TextInput
          label={this.state.label}
          style={inputStyles.textInput}
          onChangeText={(textData) => this.setState({textData})}
          underlineColorAndroid={"#c1c1c1"}
          value={this.state.textData}
          shake={true}
        />
      </View>
    )
  }

}