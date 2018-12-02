
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/tweet.css'
import like from '../assets/like.svg'
import api from '../services/api'

class Tweet extends Component {
  handleLike = async () => {
    const { _id } = this.props.tweet
    await api.post(`likes/${_id}`)
  }

  render() {
    const { tweet } = this.props
    return (
      <li className="tweet">
        <strong>{tweet.author}</strong>
        <p>{tweet.content}</p>
        <button type="button" onClick={this.handleLike}>
          <img src={like} alt="Like" />
          {tweet.likes}
        </button>
      </li>
    )
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object,
}

export default Tweet
