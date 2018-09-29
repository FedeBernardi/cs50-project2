import React from 'react';
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';

export default class MovieItem extends React.Component {

    render() {
        let {movie, selectionHandler} = this.props;

        return <TouchableOpacity
            onPress={() => selectionHandler(movie.imdbID)}
            style={styles.container}
        >
            <View style={styles.imageContainer}>
                <Image style={{width: '100%', height: '100%'}} source={{uri: movie.poster}} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text>{`${movie.type} (${movie.year})`}</Text>
            </View>
        </TouchableOpacity>;
    }

}

const styles= StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10
    },
    infoContainer: {
        justifyContent: 'center',
        padding: 10
    },
    title: {
        fontSize: 18,
        height: 44,
    },
    imageContainer: {
        height: 150,
        width: 75
    }
});

