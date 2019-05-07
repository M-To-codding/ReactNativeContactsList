import React from 'react';
import {I18nManager, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './app/navigation/AppNavigator';

try {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
} catch (e) {
  console.log(e);
}

import getAppSettings from './app/actions/getAppSettings';

export default class App extends React.Component {

  lang = {
    en: require('./app/languages/en.json'),
    ua: require('./app/languages/ua.json'),
  }

  state = {
    isLoadingComplete: false,
    homeScreenUpdate: false,
    language: 'en',
    languageData: this.lang.en
  };

  static navigationOptions = ({
    header: null,
  });

  checkSettingsScreenUpdates(shouldUpdate) {

    if (shouldUpdate) {
      setTimeout(() => {
        this.getSettings();

        this.setState({
          isLoadingComplete: false,
          languageData: this.handleLanguageJson(this.state.language)
        })
      }, 50)
    }
  }

  checkPressing(prevState, newState) {

    if (prevState.routes[0].index === 1 && newState.routes[0].index === 0) {
      this.setState({
        homeScreenUpdate: true
      })
    }

  }

  componentDidMount() {
    this.getSettings();
  }

  componentWillUnmount() {
    this.setState({
      isLoadingComplete: true,
      homeScreenUpdate: false
    })
  }

  handleLanguageJson(item) {
    let currentLang = '';

    if (item === 'en') {
      currentLang = this.lang.en;
    } else {
      currentLang = this.lang.ua;
    }

    return currentLang;
  }

  getSettings() {
    const that = this;

    getAppSettings().then((response) => {
      let data = JSON.parse(response);
      if (response) {
        that.setState({
          language: data.language,
          languageData: this.handleLanguageJson(data.language)
        })
      }
    })
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" animated={true} backgroundColor="#000000"/>}
          {Platform.OS === 'android' && <StatusBar barStyle="dark-content" animated={true} backgroundColor="#000000"/>}

          <AppNavigator onNavigationStateChange={this.checkPressing.bind(this)} screenProps={{
            homeScreenUpdate: this.state.homeScreenUpdate,
            checkSettingsScreenUpdates: this.checkSettingsScreenUpdates.bind(this),
            languageData: this.state.languageData
          }}/>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./app/assets/images/robot-dev.png'),
        require('./app/assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./app/assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
