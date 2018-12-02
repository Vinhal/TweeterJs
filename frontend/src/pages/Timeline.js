import React, { Component } from 'react'
import PropTypes from 'prop-types'
import socket from 'socket.io-client'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button'
import api from '../services/api'
import Tweet from '../components/Tweet'

import '../styles/timeline.css'

const logo = require('../assets/penguin.svg')
const avatar = require('../assets/avatar.svg')

class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: '',
    username: '',
    anchorEl: null,
  }

  async componentDidMount() {
    const username = localStorage.getItem('@Tweeter:username')

    if (username) {
      this.setState({ username })
    } else {
      this.backToLogin()
    }

    this.subscribeToEvents()

    const response = await api.get('tweets')
    if (response.data) {
      this.setState({ tweets: response.data })
    } else {
      this.setState({ tweets: [{ content: 'Error trying to request to server' }] })
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

  handleInputChange = e => this.setState({ newTweet: e.target.value })

  handleAvatarClick = event => this.setState({ anchorEl: event.currentTarget })

  handlePopOverClose = () => this.setState({ anchorEl: null })

  handleNewTweet = async (e) => {
    if (e.keyCode !== 13) return

    const { newTweet, username } = this.state

    await api.post('tweets', { content: newTweet, author: username })

    this.setState({ newTweet: '' })
  }

  backToLogin = () => this.props.history.push('/')

  render() {
    const open = Boolean(this.state.anchorEl)
    return (
      <div className="timeline-wrapper">
        <img height={40} src={logo} alt="Logo" />

        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>

        <ul className="tweet-list">
          { this.state.tweets.map(tweet => (
            <Tweet id={tweet._id} tweet={tweet} />
          ))}
        </ul>

        <div className="avatar">
          <img height={26} src={avatar} alt="avatar" onClick={this.handleAvatarClick}/>
          <Button
            size="medium"
            onClick={this.handleAvatarClick}
          >
            {this.state.username}
          </Button>
          <Popover
            id="simple-popper"
            open={open}
            anchorEl={this.state.anchorEl}
            onClose={this.handlePopOverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <p onClick={this.backToLogin} className="popOverText">Logout</p>
          </Popover>
        </div>
      </div>
    )
  }
}

Timeline.propTypes = {
  history: PropTypes.object,
}

export default Timeline
