import React from 'react';
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';

export default class MovieItem extends React.Component {

    render() {
        let {Title, selectionHandler, imdbID, Poster} = this.props;

        return <TouchableOpacity
            onPress={() => selectionHandler(imdbID)}
            style={styles.container}
        >
            <View style={styles.imageContainer}>
                <Image style={{width: '100%', height: '100%'}} source={{uri: Poster}} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{Title}</Text>
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
        justifyContent: 'center'
    },
    title: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    imageContainer: {
        height: 150,
        width: 75
    }
});

