import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default GenresRow = ({genres}) => {
    return <View style={styles.genresRowContainer}>
        {genres.map((genre, index) => <Genre key={index} genre={genre} />)}
    </View>;
}

const Genre = ({genre}) => {
    return <View style={styles.genreContainer}>
        <Text style={styles.genreText}>{genre}</Text>
    </View>;
};

const styles = StyleSheet.create({
    genresRowContainer: {
        flexDirection: 'row'
    },
    genreContainer: {
        backgroundColor: '#909293',
        borderRadius: 50,
        paddingLeft: 15,
        paddingRight: 15,
        marginRight: 5
    },
    genreText: {
        color: '#FFF'
    }
});
