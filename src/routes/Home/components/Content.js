import React from 'react'
import './HomeView.scss'
import Twitter from './twitter/Twitter'

class Content extends React.Component {
	constructor(props) {
		super(props)
		this.state = {searchText: props.searchText, tweets: ''}
	}

	componentWillReceiveProps(newProps) {
		this.setState({searchText: newProps.searchText})
	}

		// to receive tweets

	/*
	-		import io from 'socket.io-client';
 -		const socket = io();
		 if (!this.state.tweets) {
 -      socket.on('googleTweet', function (data) {
 -        if (that.state.searchText === "google") {
 -          that.setState({ tweets: data });
 -        }
 -      });
 -      
 -      socket.on('facebookTweet', function (data) {
 -        if (that.state.searchText === "facebook") {
 -          that.setState({ tweets: data });
 -        }
 -      });
 -    }
	*/

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
