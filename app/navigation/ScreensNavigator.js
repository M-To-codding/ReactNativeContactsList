import {createStackNavigator} from "react-navigation";
import ProfileScreen from "../screens/ProfileScreen";


const ScreensNavigation = createStackNavigator({
    Profile: {
      screen: ProfileScreen,
      title: 'Profile',
    }
  }, {
  headerMode: 'screen',
  }
);

export default ScreensNavigation;