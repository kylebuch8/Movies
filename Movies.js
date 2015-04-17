'use strict';

var React = require('react-native');
var {
    StyleSheet,
    ListView,
    Text,
    View,
    Image,
    ActivityIndicatorIOS,
} = React;

var REQUEST_URL = 'https://s3.amazonaws.com/nowplaying-v3/nowplaying.json';

var Movies = React.createClass({
    getInitialState: function () {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    },

    componentDidMount: function () {
        this.fetchData();
    },

    fetchData: function () {
        var self = this;

        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                responseData.forEach(function (movie) {
                    var duration = self.getDuration(movie.runtime);
                    movie.duration = duration.hours + 'h ' + duration.minutes + 'm';
                });

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData),
                    loaded: true,
                })
            })
            .done();
    },

    render: function () {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
            />
        );
    },

    /*
     * based on the number of minutes, return the number
     * of hours and minutes
     */
    getDuration: function (runtime) {
        var hours = Math.floor(runtime / 60),
            minutes = runtime % 60;

        return {
            hours: hours,
            minutes: minutes
        };
    },

    renderMovie: function (movie) {
        return (
            <View style={[styles.cellContainer, {backgroundColor: movie.colors.dominantColor}]}>
                <Image
                    source={{uri: movie.images.poster}}
                    style={styles.cellImage}
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.title, {color: (movie.textColor === 'dark') ? '#333' : 'white'}]}>{movie.title}</Text>
                    <Text style={[styles.rating, {color: (movie.textColor === 'dark') ? '#333' : 'white'}]}>{movie.ratings.critics_score}</Text>
                    <Text style={[styles.condensed, {color: (movie.textColor === 'dark') ? '#333' : 'white'}]}>
                        {movie.mpaa_rating}, {movie.duration}
                    </Text>
                </View>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cellContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    textContainer: {
        padding: 16,
    },

    cellImage: {
        width: 120,
        height: 180,
    },

    title: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 20,
    },

    condensed: {
        fontFamily: 'RobotoCondensed-Regular',
    },

    rating: {
        fontSize: 60,
        fontFamily: 'Roboto-Thin',
    }
});

module.exports = Movies;
