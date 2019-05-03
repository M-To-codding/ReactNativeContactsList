import {AsyncStorage} from 'react-native';
import settings from './../data/settings';
import getAppSettings from './../actions/getAppSettings';


let contactsCount = 10;
let url = `https://randomuser.me/api/?results=${contactsCount}&noinfo`;

function getContactsSettings() {

  getAppSettings().then((response) => {

    if (response) {
      let data = JSON.parse(response)

      return contactsCount = parseInt(data.recommended.selectedCount);
    }
  })

}
getContactsSettings();


export default function () {
  getContactsSettings();

  url = `https://randomuser.me/api/?results=${contactsCount}&noinfo`;

  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      // handledData = JSON.stringify(data);
      // console.log(JSON.stringify(data));
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
}
