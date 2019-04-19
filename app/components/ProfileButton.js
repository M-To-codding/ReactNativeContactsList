import React from 'react';
import {Image, Linking, TouchableOpacity, View} from "react-native";
import profileStyles from "../assets/styles/Profile";
import deepDiffer from 'react-native/lib/deepDiffer'


export default class ProfileButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      btnsData: props.btnsData,
      user: props.user,
      saved: props.user.saved
    }
  }

  addContact(contact, pressHandler) {
    if (this.state.saved) {
      return;
    }

    if (contact.saved) {
      return;
    }

    contact.saved = !this.state.saved;
    this.props.saved = contact.saved;

    pressHandler(contact);

    this.setState({
      saved: contact.saved
    })
  }

  handleButtonsData() {
    let btnComponent = this.state.btnsData;

    return btnComponent.map((btn, index) => {

      const btnStyle = btn.btnStyle;
      const linkingUrl = btn.linkingUrl;
      const img = btn.img;
      const imgStyle = btn.imgStyle;
      const key = 'btn-' + index;
      const saveContact = btn.onPressBtn;
      const user = this.state.user;
      const styleForAddContactBtn = this.state.user.saved ? profileStyles.disabledBtn : '';

      console.log('linkingUrl')
      console.log(linkingUrl)

      return (
        <TouchableOpacity key={key} style={[btnStyle, index === 2 ? styleForAddContactBtn : '']}
                          onPress={saveContact ? () => this.addContact(user, saveContact) : () => Linking.openURL(linkingUrl)}>
          <Image
            source={{uri: img}}
            style={imgStyle}/>
        </TouchableOpacity>
      )
    })

  }


  render() {
    const btn = this.handleButtonsData();

    return btn;
  }

}