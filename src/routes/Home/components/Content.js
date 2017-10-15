import React from 'react'
import './HomeView.scss'

class Content extends React.Component { 
	constructor(props) {
		super(props)
		this.state = {searchText: props.searchText, tweets: ''}
	}

	componentWillReceiveProps(newProps) {
		this.setState({searchText: newProps.searchText})
	}

	render () {

		// TODO, define actual layout
		// keep it as 4 equal squares for now
		// pass down data to children as needed
		
		return (
				<div className='container-fluid'>
          <div className='row'>
	          <div className='col-md-6'>
	            <h1>{this.state.searchText}</h1>
	          </div>
	          <div className='col-md-6'>
	            <h1>component 2</h1>
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