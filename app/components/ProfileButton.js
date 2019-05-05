import React from 'react';
import {Image, Linking, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import deepDiffer from 'react-native/lib/deepDiffer'

import buttonsStyles from "../assets/styles/ProfileButtons";


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
    // if (this.state.saved) {
    //   return;
    // }
    //
    // if (contact.saved) {
    //   return;
    // }

    // contact.saved = !this.state.saved;
    if (contact.saved) {
      contact.login.uuid += '1';
    } else {
      contact.saved = true;
    }

    this.setState({
      saved: contact.saved
    });

    pressHandler(contact);

    this.props.goBack(true);
  }

  removeContact(contact, pressHandler) {
    contact.saved = !this.state.saved;
    this.props.saved = contact.saved;

    pressHandler(contact.login.uuid);

    this.props.goBack(true);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.saved !== prevState.saved) {
      this.setState({
        saved: this.props.saved
      });
    }
  }

  handleButtonsData() {
    let btnComponent = this.state.btnsData;

    return btnComponent.map((btn, index) => {

      const btnStyle = btn.btnStyle;
      const linkingUrl = btn.linkingUrl;
      const icon = btn.iconName;
      const imgStyle = btn.imgStyle;
      const key = 'btn-' + index;
      const saveContact = btn.onPressBtn;
      const user = this.state.user;
      // let styleForAddContactBtn = this.state.user.saved ? buttonsStyles.disabledBtn : '';
      let styleForAddContactBtn = '';
      let onPressHandler = saveContact ? () => this.addContact(user, saveContact) : () => Linking.openURL(linkingUrl);


      if (btnComponent.length > 3) {
        styleForAddContactBtn = btnStyle;
      }

      if (index === 3) {
        onPressHandler = () => this.removeContact(user, saveContact)
      }

      return (
        <TouchableOpacity key={key} style={[btnStyle, index === 2 ? styleForAddContactBtn : '']}
                          onPress={onPressHandler}>
          <Icon
            name={icon}
            style={imgStyle}
            color='#fff'
          />
        </TouchableOpacity>
      )
    })

  }

  render() {
    const btn = this.handleButtonsData();

    return btn;
  }

}