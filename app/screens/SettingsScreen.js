import React from 'react';
import Settings from '../components/Settings/Settings';


export default class SettingsScreen extends React.Component {
  static navigationOptions = ({
    header: null
  });

  render() {
    return <Settings checkSettingsScreenUpdates={this.props.screenProps.checkSettingsScreenUpdates} languageData={this.props.screenProps.languageData}/>
  }
}

