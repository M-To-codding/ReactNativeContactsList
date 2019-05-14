import {AsyncStorage} from 'react-native';
import settings from './../data/settings';


const getAppSettings = async () => {

  try {
    const settingsData = await AsyncStorage.getItem('settingsData');

    if (!settingsData ) {
      await AsyncStorage.setItem('settingsData', JSON.stringify(settings));
      return settings;
    }

    if (settingsData ) {
      return settingsData;
    }

  } catch (e) {
    console.log(e);
  }

};

export default getAppSettings;