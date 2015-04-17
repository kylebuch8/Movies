'use strict';

var React = require('react-native');
var {
    StyleSheet,
    ListView,
    Text,
    View
} = React;

var Movies = React.createClass({
    getInitialState: function () {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
    },

    render: function () {
        return (
            <View style={styles.container}>
                <Text>Hey</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

module.exports = Movies;
