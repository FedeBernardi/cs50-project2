import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

import MovieItem from '../components/MovieItem';

export default class MoviesList extends React.Component {

    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    renderItem({item}) {
        return <MovieItem movie={item} selectionHandler={this.props.selectionHandler}/>
    }

    render() {
        return <FlatList 
            data={this.props.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.imdbID + index}
        />
    }

}
