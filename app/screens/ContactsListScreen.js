import React from 'react';
import {FlatList, RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {ContactsList} from "../components/ContactsList/ContactsList";

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

    setTimeout(()=>{
      this.setState({
        refreshing: false,
        refreshList: false
      })
    }, 100)
  }

  render() {
    return (
      <ScrollView style={styles.container}
                  refreshControl={
                    <RefreshControl
                      onRefresh={()=>this._onRefresh()}
                      refreshing={this.state.refreshing}
                      tintColor="white"
                    />
                  }>

        <View>
          <ContactsList navigation={this.props.navigation} refreshTheList={this.state.refreshList}> </ContactsList>
        </View>

      </ScrollView>
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