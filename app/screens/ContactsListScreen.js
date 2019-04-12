import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {ContactsList} from "../components/ContactsList/ContactsList";

export default class ContactsListScreen extends React.Component {

  static navigationOptions = ({
    header: null,
  });

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}

        <View>
          <ContactsList navigation={this.props.navigation}> </ContactsList>
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


