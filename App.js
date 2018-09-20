import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
