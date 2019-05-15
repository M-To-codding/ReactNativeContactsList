import {AsyncStorage} from 'react-native';


const storeData = async (contact) => {

  try {
    let contactsArr = await AsyncStorage.getItem('userContacts') || [];

    if (contactsArr.length > 0) {
      contactsArr = JSON.parse(contactsArr);

      await contactsArr.forEach((item, index) => {
        if (item.login.uuid === contact.login.uuid) {
          contactsArr.splice(index, 1);
        }
      })
      contactsArr.push(contact);

    } else {
      contactsArr = [];
      contactsArr.push(contact);
    }

    await AsyncStorage.setItem('userContacts', JSON.stringify(contactsArr));

  } catch (e) {
    console.log(e);
  }

};

export default storeData;