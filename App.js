import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import MainNavigator from './src/navigators/mainNavigator';
import store from './src/redux/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App;
