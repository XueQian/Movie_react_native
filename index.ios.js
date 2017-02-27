import React, {Component} from 'react';
import  {
    AppRegistry,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const API_URL = 'https://api.douban.com/v2/movie/top250?count=8&start=0';

class AwesomeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(API_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
                    loaded: true,
                });
            })
            .done();
    }

    render() {
        if (!this.state.dataSource) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
            />
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading movies...
                </Text>
            </View>
        );
    }

    renderMovie(movie) {
        return (
            <View style={styles.container}>
                <Text>01</Text>

                <View style={styles.moive}>
                    <Image
                        source={{uri: movie.images.small}}
                        style={styles.thumbnail}
                    />
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{movie.title}</Text>
                        <Text style={styles.year}>{movie.original_title}</Text>
                        <Text style={styles.year}>{movie.raking.average}</Text>
                    </View>
                </View>

            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F1',
        padding: 5,
    },
    moive: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 70,
        height: 81,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);