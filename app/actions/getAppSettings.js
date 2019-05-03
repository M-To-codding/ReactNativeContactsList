import {AsyncStorage} from 'react-native';
import settings from './../data/settings';


const getAppSettings = async () => {

  try {
    // await AsyncStorage.setItem('settingsData', JSON.stringify(settings));
    const settingsData = await AsyncStorage.getItem('settingsData');

    if (settingsData ) {
      return settingsData;
    }

  } catch (e) {
    console.log(e);
  }

};

export default getAppSettings;