import React from 'react';
import { View, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default class RatingMovie extends React.Component {

    render() {
        return <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={'md-star'} size={12} color={'#FFF'} />
            <Text style={{fontSize: 12, color: '#FFF', marginLeft: 5}}>{this.props.rating}</Text>
        </View>;
    }
}
