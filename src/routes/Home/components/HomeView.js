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
    this.onSearchClick = this.onSearchClick.bind(this)
    this.onSearchEnter = this.onSearchEnter.bind(this)
    this.onClickStockIcon = this.onClickStockIcon.bind(this)
    this.resetClick = this.resetClick.bind(this)
  }

  resetClick() {
      if (this.state.searched === false)
        return;

      this.setState({searched: false});

      // update children
      this.setState({searchText: ''})
  }

  onSearchClick () {
    if (this.state.fieldValue === ''){
        this.resetClick();
        return;
    }

    this.setState({searched: this.state.fieldValue !== ''});

    // update children
    this.setState({searchText: this.state.fieldValue})
  }
  onClickStockIcon (stockname) {
      this.setState({
          searchText: stockname,
          searched: true
      });
  }

  onSearchEnter (ev) {
    // console.log(`Pressed keyCode ${ev.key}`);
    if (ev.key === 'Enter') {

        this.setState({searched: this.state.fieldValue !== ''});

        // update children
        this.setState({searchText: this.state.fieldValue})
        this.setState({fieldValue: ''})
        ev.preventDefault();
    }
  }

  onChange(e) {
    this.setState({fieldValue: e.target.value})
  }

  render () {
    let content = this.state.searched ? (<Content searchText={this.state.searchText}/>) : (<Splash onClickStockIcon={this.onClickStockIcon} />)

    return (
      <div className='content-area'>
        <AppBar position='static'>
          <Toolbar className='toolBar'>
          <Button
              color="contrast"
              onClick={this.resetClick.bind(this)}
            >
              Stock The Prices
           </Button>
            <form className='form' >
              <TextField
                value={this.state.fieldValue}
                onChange={this.onChange.bind(this)}
                onKeyPress={this.onSearchEnter.bind(this)}
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
