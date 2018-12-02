import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/login.css'

const logo = require('../assets/penguin.svg')

class Login extends Component {
  state = {
    username: localStorage.getItem('@Tweeter:username'),
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username } = this.state
    const { history } = this.props

    if (!username.length) return

    localStorage.setItem('@Tweeter:username', username)

    this.setState({ username: 'Xablau' })

    history.push('/timeline')
  }

  handleInputChange = e => this.setState({ username: e.target.value })

  render() {
    const { username } = this.state
    return (
      <div className="login-wrapper">
        <img height={40} src={logo} alt="Logo" />
        <form onSubmit={this.handleSubmit}>
          <input
            value={username}
            onChange={this.handleInputChange}
            placeholder="Digite o nome do usuário"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  history: PropTypes.object,
}

export default Login
