import React from 'react';
import { View, TextInput, StyleSheet, Button, FlatList } from 'react-native';
import { Constants } from 'expo';

import { searchToAPIByTitle } from '../api';

import MoviesList from '../components/MoviesList';

export default class MoviesListScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      queryString: '',
      data: []
    }
    this.onPressHandler = this.onPressHandler.bind(this);
    this.onMovieSelection = this.onMovieSelection.bind(this);
  }

  onMovieSelection(movieId) {
    this.props.navigation.navigate('Details', {movieId});
  }

  // We execute the first call to know how many results there are
  async firstRequestToAPI(title) {
    const data = await searchToAPIByTitle(title);
          pages = Math.ceil(data.totalResults / 100),
          // We calculate how many more calls we need to do to get all movies.
          // Given that the API only allows 1000 calls a day I decided to reduce the
          // number of pages to look for.
          pagesArray = Array.from({length: pages - 1});

    this.setState({data: data});
    pagesArray.forEach(async (element, index) => {
      // We add 2 to avoid the first page
      const data = await searchToAPIByTitle(title, index + 2);
      this.setState({data: [...this.state.data, ...data]});
    });
  }

  onPressHandler() {
    let text = this.state.queryString.replace(' ', '+');
    this.firstRequestToAPI(text);
  }

  render() {
    return <View style={styles.container}>
      <TextInput 
        placeholder={'Movie, serie, episode'}
        onChangeText={(queryString) => this.setState({queryString})}
        style={styles.input}
      />
      <Button title={'Search'} onPress={this.onPressHandler} />
      <MoviesList data={this.state.data} selectionHandler={this.onMovieSelection}/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: 10
  },
  input: {
    fontSize: 35,
    paddingLeft: 15,
    marginBottom: 20
  }
});
