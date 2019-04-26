import React from 'react';
import Settings from '../components/Settings/Settings';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
   header: null
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <Settings/>
  }
}

