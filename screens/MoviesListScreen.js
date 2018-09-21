import React from 'react';
import { View, TextInput, StyleSheet, Button, FlatList } from 'react-native';
import { Constants } from 'expo';

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
  firstRequestToAPI(text) {
    fetch(`http://www.omdbapi.com/?apikey=e984745b&s=${text}`)
      .then( response => {
        let data = JSON.parse(response._bodyInit);
        this.setState({data: data.Search});
        console.log(data.Search);

        // Now we calculate how many more call we need to do to get all movies.
        // Given that the API only allows 1000 calls a day I decided to reduce the
        // number of pages to look for.
        return Math.ceil(data.totalResults / 100);
      })
      .then((pages) => {
        // We substract the first page because it was already fetch.
        pagesArray = Array.from({length: pages - 1});
        pagesArray.forEach((element, index) => {
          // We add 2 to avoid the first page
          this.requestToAPI(text, index + 2);
        });
      });
  }

  requestToAPI(text, page) {
    fetch(`http://www.omdbapi.com/?apikey=e984745b&s=${text}&page=${page}`)
      .then( response => {
        let data = JSON.parse(response._bodyInit);
        this.setState({data: [...this.state.data, ...data.Search]});
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
