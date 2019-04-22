import {AsyncStorage} from 'react-native';


const getData  = async () => {
  try {
    const value = await AsyncStorage.getItem('userContacts');

    if (value !== null) {
      return value;
    }

  } catch (error) {
    console.log(error);
  }

};

export default getData;