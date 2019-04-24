import {AsyncStorage} from 'react-native';


const getData  = async (contactId) => {

  try {
    const values = await AsyncStorage.getItem('userContacts');
    let contactsArr = JSON.parse(values);
    contactsArr.forEach(function (item, index) {
      if(contactId === item.login.uuid) {
        contactsArr.splice(index, 1);
      }
    });

    await AsyncStorage.setItem('userContacts', JSON.stringify(contactsArr));

  } catch (error) {
    console.log(error);
  }

};

export default getData;