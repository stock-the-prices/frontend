import React from 'react'
import './HomeView.scss'
import Twitter from './twitter/Twitter'

class Content extends React.Component {
	constructor(props) {
		super(props)
		this.state = {company: props.searchText}
	}

	componentWillReceiveProps(newProps) {
		this.setState({company: newProps.searchText});
	}

	render () {

		// TODO, define actual layout
		// keep it as 4 equal squares for now
		// pass down data to children as needed

		return (
				<div className='container-fluid'>
          <div className='row'>
          <div className='col-md-6'>
            <h1>{this.state.company}</h1>
          </div>
          <div className='col-md-6'>
            <Twitter tweetIDs='' />
          </div>
          <div className='col-md-6'>
            <h1>component 3</h1>
          </div>
          <div className='col-md-6'>
            <h1>component 4</h1>
          </div>
          </div>
        </div>
			)
	}
}

export default Content
