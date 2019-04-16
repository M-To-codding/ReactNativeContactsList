import AsyncStorage from 'react-native';


const getData = async () => {
  try {
    let data = await AsyncStorage.getItem('userContact', (err, item) => {
      if (item) {
       console.log(item)
        return item;
      }
      return data;
    });
  } catch (error) {
    console.log("Error retrieving data" + error);
  }
}

export default getData;