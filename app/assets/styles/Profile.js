import {Platform, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let profileStyles;

export default profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center'
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
    marginTop: 300
  },
  buttonsPanel: {
    backgroundColor: '#b6d4ff'
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  labelStyle: {
    position: 'absolute',
    left: 0,
    top: -5,
    fontSize: 12,
    color: '#898989',
    zIndex: 2
  },
  textInput: {
    height: 55,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
    marginBottom: 10
  },
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
  }
});
