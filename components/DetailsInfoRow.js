import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class DetailsInfoRow extends React.Component {

    render() {
        let {items} = this.props;

        return <View style={styles.row}>
            {items.map((item, index) => {
                return typeof(item) === 'string' ?
                    <Text key={index} style={styles.rowItem}>{item}</Text> :
                    <View key={index}>{item}</View>
                }
            )}
        </View>
    }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  rowItem: {
    fontSize: 12,
    color: '#FFF'
  }
});
