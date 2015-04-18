'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Image,
    PixelRatio,
    ScrollView,
} = React;

var MovieDetail = React.createClass({
    render: function () {
        return (
            <ScrollView
                contentInset={{top: -60}}>
                <View style={styles.detailBg}>
                    <Image
                        source={{uri: this.props.movie.images.bg}}
                        style={styles.bg}
                    />
                    <View style={styles.detail}>
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
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.header}>Synopsis</Text>
                    <View style={styles.cellBorder} />
                    <Text>{this.props.movie.synopsis}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.header}>Cast</Text>
                    <View style={styles.cellBorder} />
                    {this.props.movie.abridged_cast.map(createActorRow)}
                </View>
            </ScrollView>
        );
    },
});

var ActorRow = React.createClass({
    shouldUpdateComponent: function () {
        return false;
    },

    render: function () {
        var character = (this.props.actor.characters) ? <Text style={styles.character}>{this.props.actor.characters[0]}</Text> : null;
        
        return (
            <View>
                <Text>{this.props.actor.name}</Text>
                {character}
                <View style={styles.cellBorder} />
            </View>
        );
    },
})

var createActorRow = (actor, i) => <ActorRow actor={actor} key={i} />;

var styles = StyleSheet.create({
    bg: {
        flex: 1,
        height: 350,
    },

    detailBg: {
        backgroundColor: 'black',
    },

    detail: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 350,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        top: 20,
        padding: 16,
    },

    cellImage: {
        width: 120,
        height: 180,
    },

    textContainer: {
        padding: 16,
    },

    title: {
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 20,
        color: 'white',
    },

    condensed: {
        fontFamily: 'RobotoCondensed-Regular',
        color: 'white',
    },

    rating: {
        fontSize: 60,
        fontFamily: 'Roboto-Thin',
        color: 'white',
    },

    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
        marginTop: 16,
        marginBottom: 16,
    },

    header: {
        fontFamily: 'Roboto-Thin',
        fontSize: 22,
    },

    character: {
        color: '#999',
    },
});

module.exports = MovieDetail;
