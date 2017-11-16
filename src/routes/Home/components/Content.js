import React from 'react'
import './HomeView.scss'
import Twitter from './twitter/Twitter'
import io from 'socket.io-client'

class Content extends React.Component {
	constructor(props) {
		super(props)
		this.state = {searchText: props.searchText, tweets: []}
	}

	componentWillReceiveProps(newProps) {
		if (this.state.tweets.length === 10)
			this.setState({searchText: newProps.searchText, tweets: []});
		else {
			this.setState({searchText: newProps.searchText});
		}
	}

	componentDidMount() {

		const that = this;
		const socket = io('http://localhost:3002');

		socket.on('googleTweet', function (data) {
			if (that.state.searchText === "google" && that.state.tweets.length < 10) {
				//console.log(data);
				that.state.tweets.push(data);
				that.setState(that);
			}
		});

		socket.on('googleTweet', function (data) {
			if (that.state.searchText === "facebook" && that.state.tweets.length < 10) {
				//console.log(data);
				that.state.tweets.push(data);
				that.setState(that);
			}
		});
	}

	render () {

		return (
				<div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6'>
              <h1>{this.state.searchText}</h1>
            </div>
            <div className='col-md-6'>
              <Twitter tweetIDs='' tweets={this.state.tweets} />
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
