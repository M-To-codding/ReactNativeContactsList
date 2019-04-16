import AsyncStorage from 'react-native';


const storeData = async (contact) => {
  console.log(contact)
  try {
    await AsyncStorage.setItem('userContact', JSON.stringify(contact));
    console.log(AsyncStorage.getItem('userContact'));
  } catch (e) {
    // saving error
  }
}

export default storeData;