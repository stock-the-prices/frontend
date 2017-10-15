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


class PageLayout extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='root text-center'>
        <div className='content-area page-layout__viewport'>
          {this.props.children}
        </div>
      </div>
      )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
