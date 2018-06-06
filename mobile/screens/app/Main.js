import { createBottomTabNavigator } from 'react-navigation';
import ProfileScreen from './ProfileScreen';

const Main = createBottomTabNavigator({
  Profile: { screen: ProfileScreen }
});

export default Main;
