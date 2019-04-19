import {AsyncStorage} from 'react-native';


const storeData = async (contact) => {
  try {

    await AsyncStorage.setItem('userContact', JSON.stringify(contact));

  } catch (e) {

    console.log(e);

  }
}

export default storeData;