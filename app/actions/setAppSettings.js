import {AsyncStorage} from 'react-native';


const setAppSettings = async (settingsData) => {

  try {
    // await AsyncStorage.getItem('userContacts');
    await AsyncStorage.setItem('settingsData', JSON.stringify(settingsData));

  } catch (e) {
    console.log(e);
  }

};

export default setAppSettings;