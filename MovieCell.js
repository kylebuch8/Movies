'use strict';

var React = require('react-native');
var {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    PixelRatio,
} = React;

var MovieCell = React.createClass({
    render: function () {
        return (
            <View>
                <TouchableOpacity onPress={this.props.onSelect}>
                    <View style={styles.cellContainer}>
                        <Image
                            source={{uri: this.props.movie.images.poster}}
                            style={styles.cellImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{this.props.movie.title}</Text>
                            <Text style={styles.rating}>{this.props.movie.ratings.critics_score}</Text>
                            <Text style={styles.condensed}>
                                {this.props.movie.mpaa_rating}, {this.props.movie.duration}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.cellBorder} />
            </View>
        );
    }
});

var styles = StyleSheet.create({
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
    },

    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
    },
});

module.exports = MovieCell;
