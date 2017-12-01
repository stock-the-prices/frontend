import React from 'react'
import './HomeView.scss'
import Twitter from './twitter/Twitter'
import News from './stock/News'
import Rating from './rating/Rating'
import Stock from './stock/Stock'
import io from 'socket.io-client'
import 'whatwg-fetch'

class Content extends React.Component {
	constructor(props) {
		super(props)
		this.state = {articles: [], searchText: props.searchText, tweets: [], stockname: ''}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {

			if (this.state.tweets.length === 10){
				if (this.props.searchText.toUpperCase() === nextProps.searchText.toUpperCase())
					return;
				this.setState({searchText: nextProps.searchText, tweets: []});
			}
			else {
				this.setState({searchText: nextProps.searchText});
			}
		}
	}

    fetchData(){
	    const that = this;
	    const url = 'http://localhost:3000/api/articles/' + that.state.stockname;
	    fetch(url)
	    .then(function(response) {
	    	return response.json()
	    }).then(function(articles) {
	    	that.setState({articles: articles});
	    })
	    .catch(function(error) { console.log("Error", error) })
	}

	componentDidMount() {
		const that = this;
		const socket = io('http://localhost:3002');

		socket.on('googleTweet', function (data) {
			if (that.state.searchText === "Google" || that.state.searchText === "GOOGL") {
				if (that.state.tweets.length < 10) {
					//console.log(data);
					that.state.tweets.push(data);
					that.setState({stockname: 'GOOGL'});
					that.fetchData();
					that.setState(that);
				}
			}
		});

		socket.on('facebookTweet', function (data) {
			if (that.state.searchText === "Facebook" || that.state.searchText === "FB") {
				if (that.state.tweets.length < 10) {
					//console.log(data);
					that.state.tweets.push(data);
					that.setState({stockname: 'FB'});
					that.fetchData();
					that.setState(that);
				}
			}
		});

		socket.on('appleTweet', function (data) {
			if (that.state.searchText === "Apple" || that.state.searchText === "AAPL") {
				if (that.state.tweets.length < 10) {
					//console.log(data);
					that.state.tweets.push(data);
					that.setState({stockname: 'AAPL'});
					that.fetchData();
					that.setState(that);
				}
			}
		});

		socket.on('testTweet', function (data) {
			if (that.state.searchText === "TST" || that.state.searchText === "test") {
				if (that.state.tweets.length < 10) {
					//console.log(data);
					that.state.tweets.push(data);
					that.setState({stockname: 'TST'});
					that.fetchData();
					that.setState(that);
				}
			}
		});


	}

	render () {
		return (
				<div className='container-fluid'>
		          <div className='row' style={{marginTop:'1em'}}>
		            <div className='col-md-6'>
						<Stock stockname={this.state.searchText}/>
		            </div>
		            <div className='col-md-6'>
		              <Twitter tweetIDs='' tweets={this.state.tweets} />
		            </div>
		            <div className='col-md-6'>
		              <News articles={this.state.articles}/>
		            </div>
		            <div className='col-md-6'>
		              {this.state.stockname && <Rating stockname={this.state.stockname}/>}
		            </div>
		          </div>
		        </div>
			)
	}
}

export default Content
