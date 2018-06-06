import { createSwitchNavigator } from 'react-navigation';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';

const Main = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen }
});

export default Main;
