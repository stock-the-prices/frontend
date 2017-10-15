import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField';
import io from 'socket.io-client';
const socket = io();

class PageLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchText: '', tweets:''}
  }

  componentDidMount() {
    const that = this;
    if (!this.state.tweets) {
      socket.on('googleTweet', function (data) {
        if (that.state.searchText === "google") {
          that.setState({ tweets: data });
        }
      });
      
      socket.on('facebookTweet', function (data) {
        if (that.state.searchText === "facebook") {
          that.setState({ tweets: data });
        }
      });
    }
  }

  onSearchClick () {
    let searchText = this.state.searchText;
  
  render () {
    return (
      <div className='root text-center'>
        <div className='content-area page-layout__viewport'>
          {this.props.children}
          {this.state.tweets}
        </div>
      </div>
      )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
