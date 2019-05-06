import React from 'react';
import {FlatList, RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {ExpoLinksView} from '@expo/samples';
import {ContactsList} from "../components/ContactsList/ContactsList";
import FloatingAddContactButton from "../components/FloatingAddContactButton";
import AppNavigator from "../navigation/AppNavigator";

export default class ContactsListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      refreshList: false
    }
  }

  static navigationOptions = ({
    header: null,
  });

  _onRefresh() {
    this.setState({
      refreshing: true,
      refreshList: true
    })

    setTimeout(() => {
      this.setState({
        refreshing: false,
        refreshList: false
      })
    }, 100)
  }

  checkUpdates(updated) {
    this.forceUpdate();
  }

  render() {
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container}
                    refreshControl={
                      <RefreshControl
                        onRefresh={() => this._onRefresh()}
                        refreshing={this.state.refreshing}
                        tintColor="white"
                      />
                    }>
          <ContactsList navigation={this.props.navigation} refreshTheList={this.state.refreshList}
                        checkUpdates={this.checkUpdates.bind(this)}> </ContactsList>

        </ScrollView>

        <FloatingAddContactButton navigation={this.props.navigation} isNewContact={true} checkUpdates={this.checkUpdates.bind(this)}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});