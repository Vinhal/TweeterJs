import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import socket from 'socket.io-client'
import api from '../services/api'
import Tweet from '../components/Tweet'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
})

class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Início',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('NewTweet')}>
        <Icon style={{ marginRight: 20 }} name="add-circle-outline" size={24} color="#4BB0EE" />
      </TouchableOpacity>
    ),
  })

  state = {
    tweets: [],
  }

  async componentDidMount() {
    const response = await api.get('tweets')
    if (response.data) {
      this.setState({ tweets: response.data })
    }
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3000')

    io.on('tweet', data => (
      this.setState(prevState => ({ tweets: [data, ...prevState.tweets] }))
    ))

    io.on('like', data => (
      this.setState(prevState => ({
        tweets: prevState.tweets.map(tweet => (tweet._id === data._id ? data : tweet)),
      }))
    ))
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    )
  }
}

export default Timeline
