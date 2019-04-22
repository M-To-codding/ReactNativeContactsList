import {Platform, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let inputStyles;

export default inputStyles = StyleSheet.create({

  labelStyle: {
    position: 'absolute',
    left: 0,
    top: -5,
    fontSize: 12,
    color: '#898989',
  },
  textInput: {
    height: 55,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
    marginBottom: 10
  },
});
