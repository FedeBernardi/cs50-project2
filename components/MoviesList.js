import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import MovieItem from '../components/MovieItem';

export default class MoviesList extends React.Component {
    static propTypes = {
        selectionHandler: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired
    }

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
