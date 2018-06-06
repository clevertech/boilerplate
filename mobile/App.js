import { createSwitchNavigator } from 'react-navigation';
import AuthenticationFlow from './screens/authentication/Main';
import AppFlow from './screens/app/Main';

const App = createSwitchNavigator({
  Authentication: { screen: AuthenticationFlow },
  App: { screen: AppFlow }
});

export default App;
