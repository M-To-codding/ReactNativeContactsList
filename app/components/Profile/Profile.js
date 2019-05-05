import React from "react";
import {Picker, Text, TextInput, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderImageScrollView, {TriggeringView} from "react-native-image-header-scroll-view";
import DatePicker from "react-native-datepicker";


import {setData} from "../../data/buttons";
import ProfileButton from "../ProfileButton";
import storeData from "../../actions/storeDataInAsyncStorage";
import removeData from "../../actions/removeDataFromAsyncStorage";


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    const user = props.user;

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
      editable: user.editable
    }
  }

  // updateContact(contact) {
  //   let
  //
  //   storeData(contact);
  //   this.props.navigation.state.params.checkUpdates(true);
  //   this.props.navigation.state.params.handleChackedContactsInList(contact.login.uuid, 'saved');
  // }

  saveContact(contact) {

    contact.name.first = this.state.name;
    contact.name.last = this.state.lastName;
    contact.gender = this.state.gender;
    contact.dob.date = this.state.date;
    contact.phone = this.state.phone;
    contact.email = this.state.email;

    storeData(contact);
    this.props.navigation.state.params.checkUpdates(true);
    this.props.navigation.state.params.handleCheckedContactsInList(contact.login.uuid, 'saved');
  }

  removeContact(id) {
    removeData(id);
    this.props.navigation.state.params.checkUpdates(true);
    this.props.navigation.state.params.handleCheckedContactsInList(id, 'deleted');
  }

  handleProfileButtons() {
    let btnsData;

    if (this.state.saved) {
      btnsData = setData(this.state, this.saveContact.bind(this), this.removeContact.bind(this));
    } else {
      btnsData = setData(this.state, this.saveContact.bind(this));
    }

    let container = '';

    // if (this.state.saved) {
    container =
      <View style={this.state.profileStyles.btnsContainer}>
        <ProfileButton btnsData={btnsData} user={this.state.user} goBack={this.props.goBack}/>
      </View>;
    // }

    return container;
  }


  render() {
    const profileButtons = this.handleProfileButtons();
    let disabledInputStyle = '';
    let editableInput = true;

    if (!this.state.editable && !this.state.saved) {
      disabledInputStyle = {backgroundColor: 'transparent',color: '#e1e1e1'};
      editableInput = false;
    }

    return (

      <View style={[this.state.profileStyles.detailsContainer, {minHeight: hp('83%')}]}>
        <TriggeringView onHide={() => console.log("text hidden")}>

          {profileButtons}

          <View>
            <Text style={this.state.profileStyles.labelStyle}>Name</Text>
            <TextInput
              label="Name"
              style={[this.state.profileStyles.textInput, disabledInputStyle]}
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
              style={[this.state.profileStyles.textInput, disabledInputStyle]}
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
              editable={editableInput}
              style={[this.state.profileStyles.textInput, disabledInputStyle]}
              onChangeText={(phone) => this.setState({phone})}
              underlineColorAndroid={'#c1c1c1'}
              value={this.state.phone}
              shake={true}
            />
          </View>

          <View>
            <Text style={this.state.profileStyles.labelStyle}>E-mail: </Text>
            <TextInput
              editable={editableInput}
              style={[this.state.profileStyles.textInput, disabledInputStyle]}
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