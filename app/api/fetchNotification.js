import {AsyncStorage} from 'react-native';
import settings from './../data/settings';
import getAppSettings from './../actions/getAppSettings';


// let timeout = 150000;
let url = `http://randomuselessfact.appspot.com/random.json`;

//
// function getContactsSettings() {
//
//   getAppSettings().then((response) => {
//
//     if (response) {
//       let data = JSON.parse(response)
//
//       return timeout = parseInt(data.notifications.notificationsDelay.selectedCount);
//     }
//   })
//
// }
// getContactsSettings();


export default function () {
  // getContactsSettings();

  //
  // setTimeout(function () {

    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log('error: ' + error);
      });

  // }, timeout)
}
