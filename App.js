import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MoviesListScreen from './screens/MoviesListScreen';
import MoviesDetailsScreen from './screens/MovieDetailsScreen';

const AppNavigator = createStackNavigator(
  {
    Movies: MoviesListScreen,
    Details: MoviesDetailsScreen
  },
  {
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
