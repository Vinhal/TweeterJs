import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native'
import PropTypes from 'prop-types'
import { StackActions, NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    marginTop: 30,
  },
  button: {
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#4BB0EE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class Login extends Component {
  static navigationOptions = {
    header: null,
  }

  state = {
    username: '',
  }

  async componentDidMount() {
    const username = AsyncStorage.getItem('@Twitter:username')
    if (username) {
      this.navigateToTimeline()
    }
  }

  handleInputText = username => this.setState({ username })

  handleLogin = async () => {
    const { username } = this.state
    if (!username.length) return
    await AsyncStorage.setItem('@Twitter:username', username)
    this.navigateToTimeline()
  }

  navigateToTimeline = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Timeline' }),
      ],
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <Icon name="twitter" size={64} color="#4BB0EE" />
          <TextInput
            style={styles.input}
            placeholder="Nome do Usuário"
            value={this.state.username}
            onChangeText={this.handleInputText}
            returnKeyType="send"
            onSubmitEditing={this.handleLogin}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

Login.propTypes = {
  navigation: PropTypes.object,
}

export default Login
