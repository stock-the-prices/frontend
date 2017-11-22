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

			if (that.state.searchText === "google" || that.state.searchText === "GOOGL") {
				if (that.state.tweets.length < 10) {
					//console.log(data);
					that.state.tweets.push(data);
					that.setState(that);
				}
			}
		});

		socket.on('facebookTweet', function (data) {
			if (that.state.searchText === "facebook" || that.state.searchText === "FB") {
				if (that.state.tweets.length < 10) {
					//console.log(data);
					that.state.tweets.push(data);
					that.setState(that);
				}
			}
		});

		socket.on('appleTweet', function (data) {
			if (that.state.searchText === "apple" || that.state.searchText === "AAPL") {
				if (that.state.tweets.length < 10) {
					//console.log(data);
					that.state.tweets.push(data);
					that.setState(that);
				}
			}
		});

		socket.on('testTweet', function (data) {
			if (that.state.searchText === "TST" || that.state.searchText === "test") {
				if (that.state.tweets.length < 10) {
					//console.log(data);
					that.state.tweets.push(data);
					that.setState(that);
				}
			}
		});
	}

	render () {

		return (
				<div className='container-fluid'>
		          <div className='row' style={{marginTop:'1em'}}>
		            <div className='col-md-6 text-center'>
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
