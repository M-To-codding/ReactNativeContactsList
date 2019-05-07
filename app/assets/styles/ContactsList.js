import {Platform, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let contactsStyles;

export default contactsStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyContactsText: {
    color: '#bebebe',
    fontWeight: 'bold'
  },
  scrollView: {
    width: '100%'
  },
 // listItemLendscape: {
 //    width:
 // }
});
