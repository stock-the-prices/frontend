import React from 'react'
import './HomeView.scss'
import Content from './Content'
import Splash from './Splash'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'


class HomeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {fieldValue: '', searchText: '', searched: false}
  }

  onSearchClick () {
    this.setState({searched: true});

    // update children
    this.setState({searchText: this.state.fieldValue})
  }

  onChange(e) {
    this.setState({fieldValue: e.target.value})
  }

  render () {
    let content = this.state.searched ? (<Content searchText={this.state.searchText}/>) : (<Splash/>)

    return (
      <div className='content-area'>
        <AppBar position='static'>
          <Toolbar className='toolBar'>
            Stock the Prices
            <form className='form' >
              <TextField 
                value={this.state.fieldValue} 
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

        {content}
      </div>
      )
  }
}

export default HomeView
