import React from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, Dimensions, Animated } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { searchToAPIById } from '../api';

import DetailsInfoRow from '../components/DetailsInfoRow';
import RatingMovie from '../components/RatingMovie';
import GenresRow from '../components/GenresRow';

export default class MoviesDetailsScreen extends React.Component {

  state = {
    movie: {},
    scrollY: new Animated.Value(0)
  }

  async callToAPIForDetails() {
    const movieId = this.props.navigation.getParam('movieId');
          data = await searchToAPIById(movieId);

    this.setState({movie: data});
  }

  componentDidMount() {
    this.callToAPIForDetails();
  }

  render() {
    let {movie} = this.state;

    const spin = this.state.scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: ['0deg', '183deg']
    });

    return <View>{movie.title && <View style={styles.container}>
        <ImageBackground style={styles.background} source={{uri: movie.poster}}>
          <ScrollView
            style={styles.scroll}
            onScroll= {Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
            )}
          >
            <View style={styles.posterVisor}></View>
            <View style={styles.arrowContainer}>
              <Animated.View style={{transform: [{ rotate: spin}]}}>
                <Ionicons name={'md-arrow-up'} color={'red'} size={30}/>
              </Animated.View>
            </View>
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.title}>{movie.title}</Text>
              </View>
              <DetailsInfoRow items={[
                <GenresRow genres={movie.genres} />,
                <RatingMovie rating={movie.imdbRating} />
              ]}/>
              <DetailsInfoRow
                items={[
                  movie.released,
                  `Rated: ${movie.rated}`,
                  movie.runtime
                ]}
              />
              <Text style={styles.actors}>{`Cast: ${movie.actors}`}</Text>
              <Text style={styles.plot}>{movie.plot}</Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    }</View>;
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  container: {
    paddingTop: Constants.statusBarHeight
  },
  infoContainer: {
    backgroundColor: '#000',
    padding: 10,
    height: 300
  },
  posterVisor: {
    height: Dimensions.get('window').height - 60,
    width: null
  },
  arrowContainer: {
    alignItems: 'center',
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
    opacity: 0.7,
    backgroundColor: '#000',
  },
  title: {
    marginBottom: 10,
    fontSize: 25,
    color: '#FFF'
  },
  actors: {
    fontSize: 10,
    color: '#FFF',
    marginBottom: 15
  },
  plot: {
    fontSize: 15,
    color: '#FFF'
  },
  scroll: {
    height: '100%'
  }
});
