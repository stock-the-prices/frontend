import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField';

class PageLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {searchText: ''}
  }

  onSearchClick () {
    let searchText = this.state.searchText;

    // do search?
  }

  onChange(e) {
    this.setState({searchText: e.target.value})
  }

  render () {
    return (
      <div className='root text-center'>
        <AppBar position='static'>
          <Toolbar className='toolBar'>
            Stock the Prices
            <form className='form' >
              <TextField 
                value={this.state.searchText} 
                onChange={this.onChange.bind(this)}
              />
              
              <Button 
                color="contrast" 
                onClick={this.onSearchClick.bind(this)}
              >
                Search
              </Button>
            </form>
          </Toolbar>
        </AppBar>
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
