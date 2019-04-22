import React from "react";
import {Picker, Text, TextInput, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderImageScrollView, {TriggeringView} from "react-native-image-header-scroll-view";
import DatePicker from "react-native-datepicker";


import {setData} from "../../data/buttons";
import ProfileButton from "../ProfileButton";
import storeData from "../../actions/storeDataInAsyncStorage";


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
      saved: user.saved
    }
  }

  saveContact(contact) {
    storeData(contact);
  }

  handleProfileButtons() {
    const btnsData = setData(this.state, this.saveContact);

    const container =
      <View style={this.state.profileStyles.btnsContainer}>
        <ProfileButton btnsData={btnsData} user={this.state.user}/>
      </View>;

    return container;
  }

  render() {
    const profileButtons = this.handleProfileButtons();

    return (

      <View style={[this.state.profileStyles.detailsContainer, {minHeight: hp('83%')}]}>
        <TriggeringView onHide={() => console.log("text hidden")}>

          {profileButtons}

          <View>
            <Text style={this.state.profileStyles.labelStyle}>Name</Text>
            <TextInput
              label="Name"
              style={this.state.profileStyles.textInput}
              onChangeText={(name) => this.setState({name})}
              underlineColorAndroid={"#c1c1c1"}
              value={this.state.name}
              shake={true}
            />
          </View>

          <View>
            <Text style={this.state.profileStyles.labelStyle}>Surname</Text>
            <TextInput
              style={this.state.profileStyles.textInput}
              label="Surname"
              onChangeText={(lastName) => this.setState({lastName})}
              underlineColorAndroid={"#c1c1c1"}
              value={this.state.lastName}
              shake={true}
            />
          </View>

          <View style={{flexDirection: "row"}}>
            <View>
              <Picker
                selectedValue={this.state.gender}
                style={[
                  this.state.profileStyles.textInput,
                  {
                    height: 50,
                    width: wp('48%'),
                    borderBottomWidth: 1,
                    borderColor: '#c1c1c1',
                  }]}
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
                  }],
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
              style={this.state.profileStyles.textInput}
              onChangeText={(phone) => this.setState({phone})}
              underlineColorAndroid={'#c1c1c1'}
              value={this.state.phone}
              shake={true}
            />
          </View>

          <View>
            <Text style={this.state.profileStyles.labelStyle}>E-mail: </Text>
            <TextInput
              style={this.state.profileStyles.textInput}
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