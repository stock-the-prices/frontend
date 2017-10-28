import React from 'react'
import './HomeView.scss'
import Twitter from './twitter/Twitter'
import SideBar from './Sidebar'
import Swipe from './Swipe'

class Content extends React.Component {
	constructor(props) {
		super(props)
		this.state = {searchText: props.searchText, tweets: ''}
	}

	componentWillReceiveProps(newProps) {
		this.setState({searchText: newProps.searchText})
	}

	render () {

		return (
				<div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <SideBar/>
            </div>
            <div className='col-md-9'>
              <Swipe/>
            </div>
          </div>
        </div>
			)
	}
}

export default Content
