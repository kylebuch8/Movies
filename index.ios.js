'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
} = React;

var Movies = require('./Movies');

var MoviesApp = React.createClass({
    render: function () {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'Movies',
                    component: Movies
                }}
            />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('MoviesApp', () => MoviesApp);
