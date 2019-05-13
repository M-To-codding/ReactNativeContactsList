import React from "react";
import {Picker, Text, TextInput, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderImageScrollView, {TriggeringView} from "react-native-image-header-scroll-view";
import DatePicker from "react-native-datepicker";

import textHandlers from "./../../helpers/textHandlers";

import {setData} from "../../data/buttons";
import ProfileButton from "../ProfileButton";
import storeData from "../../actions/storeDataInAsyncStorage";
import removeData from "../../actions/removeDataFromAsyncStorage";


let userData = {
  name: {
    first: '',
    last: '',
  },
  gender: '',
  dob: {
    date: ''
  },
  phone: '',
  email: '',
  login: {
    uuid: ''
  },
  saved: true,
  isNewContact: true
}

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    const user = props.user;

    if (user) {

      this.state = {
        user: user,
        profileStyles: props.profileStyles,
        name: user.name.first,
        lastName: user.name.last,
        gender: user.gender,
        date: user.dob.date,
        phone: user.phone,
        email: user.email,
        saved: user.saved,
        editable: user.editable,
        layoutWidth: this.props.layoutWidth,
        orientation: this.props.orientation
      }
    } else {

      this.state = {
        user: userData,
        profileStyles: props.profileStyles,
        name: '',
        lastName: '',
        gender: 'male',
        date: '',
        phone: '',
        email: '',
        saved: true,
        editable: true,
        layoutWidth: this.props.layoutWidth,
        orientation: this.props.orientation
      }
    }
  }

  saveContact(contact) {
    let newContact = this.state.user;

    if (!newContact.isNewContact && !this.props.navigation.state.params.isNewContact) {
      newContact = contact;

      newContact.name.first = this.state.name;
      newContact.name.last = this.state.lastName;
      newContact.gender = this.state.gender;
      newContact.dob.date = this.state.date;
      newContact.phone = this.state.phone;
      newContact.email = this.state.email;

      storeData(newContact);
      if (this.props.navigation.state.params.handleCheckedContactsInList) {
        this.props.navigation.state.params.handleCheckedContactsInList(newContact.login.uuid, 'saved');
      }

    } else {

      newContact.name.first = this.state.name.length > 1 ? this.state.name : 'Unknown';
      newContact.name.last = this.state.lastName;
      newContact.gender = this.state.gender;
      newContact.dob.date = this.state.date;
      newContact.phone = this.state.phone;
      newContact.email = this.state.email;
      newContact.saved = true;
      newContact.picture = {
        large: 'http://www.sbsc.in/images/dummy-profile-pic.png',
        medium: 'http://www.sbsc.in/images/dummy-profile-pic.png'
      };
      newContact.login.uuid = '_01_';

      newContact.isNewContact = false;

      for (let i = 0; i < 4; i++) {
        newContact.login.uuid += Math.random();
      }

      storeData(newContact);

    }

    this.props.navigation.state.params.checkUpdates(true);
  }

  removeContact(id) {
    removeData(id);
    this.props.navigation.state.params.checkUpdates(true);
    this.props.navigation.state.params.handleCheckedContactsInList(id, 'deleted');
  }

  handleProfileButtons() {
    let btnsData;
    let user;

    if (this.state.saved) {
      btnsData = setData(this.state, this.saveContact.bind(this), this.removeContact.bind(this));
    } else {
      btnsData = setData(this.state, this.saveContact.bind(this));
    }

    let container = '';
    let buttonsContainerStyle = this.state.profileStyles.btnsContainer;
    let buttonHeight = {height: 70};

    if(this.props.isHorizontal) {
      buttonsContainerStyle = {
        width: wp('15%'),
        flexDirection: 'column',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        position: 'absolute',
        right: wp('-14%')
      }
      buttonHeight =  {height: hp('55%')};
    }

    if (!this.state.user.isNewContact && !this.props.navigation.state.params.isNewContact) {

      container =
        <View style={[buttonsContainerStyle, buttonHeight]}>
          <ProfileButton btnsData={btnsData} user={this.state.user} goBack={this.props.goBack}/>
        </View>;

    } else {

      let state = this.state;
      state.saveButton = true;
      user = state.user;

      btnsData = setData(state, this.saveContact.bind(this));

      container =
        <View style={[this.state.profileStyles.btnsContainer, buttonsContainerStyle, buttonHeight]}>
          <ProfileButton btnsData={btnsData} user={user} goBack={this.props.goBack}/>
        </View>;
    }

    return container;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.layoutWidth !== this.props.layoutWidth) {
      this.setState({
        layoutWidth: this.props.layoutWidth,
        orientation: this.props.orientation
      })
    }
  }

  render() {
    const profileButtons = this.handleProfileButtons();
    let disabledInputStyle = '';
    let editableInput = true;
    const textAlign = {textAlign: 'left'};
    const layoutWidth = this.state.layoutWidth;

    if (!this.state.editable && !this.state.saved) {
      disabledInputStyle = {backgroundColor: 'transparent', color: '#e1e1e1'};
      editableInput = false;
    }

    return (

      <View style={[this.state.profileStyles.detailsContainer, {minHeight: hp('83%'), width: this.state.layoutWidth/2.5}]}>
        <TriggeringView onHide={() => console.log("text hidden")}>

          {profileButtons}

          <View>
            <Text style={this.state.profileStyles.labelStyle}>Name</Text>
            <TextInput
              label="Name"
              style={[this.state.profileStyles.textInput, disabledInputStyle, textAlign]}
              onChangeText={(name) => this.setState({name})}
              underlineColorAndroid={"#c1c1c1"}
              value={this.state.name}
              shake={true}
              editable={editableInput}
            />
          </View>

          <View>
            <Text style={this.state.profileStyles.labelStyle}>Surname</Text>
            <TextInput
              style={[this.state.profileStyles.textInput, disabledInputStyle, textAlign]}
              label="Surname"
              onChangeText={(lastName) => this.setState({lastName})}
              underlineColorAndroid={"#c1c1c1"}
              value={this.state.lastName}
              shake={true}
              editable={editableInput}
            />
          </View>

          <View style={{flexDirection: "row"}}>
            <View>
              <Picker
                enabled={editableInput}
                selectedValue={this.state.gender}
                style={[
                  this.state.profileStyles.textInput,
                  {
                    height: 50,
                    width: wp('48%'),
                    borderBottomWidth: 1,
                    borderColor: '#c1c1c1',
                  },
                  disabledInputStyle
                ]}
                itemStyle={{
                  borderTopWidth: 1,
                  borderTopColor: '#000',
                  borderBottomWidth: 1,
                  borderBottomColor: '#000'
                }}
                underlineColorAndroid={'#c1c1c1'}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({gender: itemValue})
                }>
                <Picker.Item label={this.state.gender} value={this.state.gender}/>
                <Picker.Item label={this.state.gender === 'female' ? 'male' : 'female'}
                             value={this.state.gender === 'female' ? 'male' : 'female'}/>
              </Picker>

              {/*Some solution for android picker border style*/}
              <View style={{
                height: 1,
                width: wp('48%'),
                borderBottomWidth: 1,
                borderColor: '#c1c1c1',
                marginTop: -21,
                marginBottom: 21
              }}/>
              {/**/}

            </View>

            <View>
              <Text style={this.state.profileStyles.labelStyle}>Birthday: </Text>
              <DatePicker
                disabled={!editableInput}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: [this.state.profileStyles.textInput, {
                    border: 0,
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderColor: '#c1c1c1',
                    alignItems: 'stretch',
                    justifyContent: 'flex-end',
                    width: wp('48%'),
                  },
                    disabledInputStyle
                  ],
                  dateTouchBody: {disabledInputStyle}
                }}
                onDateChange={(date) => {
                  this.setState({date: date})
                }}
              />
            </View>
          </View>

          <View>
            <Text style={this.state.profileStyles.labelStyle}>Phone: </Text>
            <TextInput
              dataDetectorTypes='phoneNumber'
              keyboardType='phone-pad'
              editable={editableInput}
              style={[this.state.profileStyles.textInput, disabledInputStyle, textAlign]}
              onChangeText={(phone) => this.setState({phone})}
              underlineColorAndroid={'#c1c1c1'}
              value={this.state.phone}
              shake={true}
            />
          </View>

          <View>
            <Text style={this.state.profileStyles.labelStyle}>E-mail: </Text>
            <TextInput
              dataDetectorTypes='address'
              keyboardType='email-address'
              editable={editableInput}
              style={[this.state.profileStyles.textInput, disabledInputStyle, textAlign]}
              onChangeText={(email) => this.setState({email})}
              underlineColorAndroid={'#c1c1c1'}
              value={this.state.email}
              shake={true}
            />
          </View>
        </TriggeringView>
      </View>
    )
  }
}