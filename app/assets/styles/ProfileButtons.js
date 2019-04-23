import {Platform, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let buttonsStyles;

export default buttonsStyles = StyleSheet.create({
  button: {
    width: wp('33%'),
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    margin: 10,
    elevation: 4,
  },
  disabledBtn: {
    opacity: 0.2
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    backgroundColor: '#000',
    height: 70,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 15
  },
  smallButton: {
    width: wp('23%'),
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
    margin: 10,
    elevation: 4,
  }
});
