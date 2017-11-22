import React from 'react'
import './HomeView.scss'
import Twitter from './twitter/Twitter'
import News from './stock/News'
import io from 'socket.io-client'

// temp article info
let articles = [
	// {
	// 	"source" : {
	// 		"id" : null,
	// 		"name" : "Startribune.com"
	// 	},
	// 	"author" : "A Boy, That Girl and Her Dog",
	// 	"title" : "Test Test Test Short Article Test",
	// 	"description" : "Follow the StarTribune for the news, photos and videos from the Twin Cities and beyond.",
	// 	"url" : "http://www.startribune.com/test-test-test-short-article-test/391910021/",
	// 	"urlToImage" : "http://stmedia.stimg.co/8311d155264c479f93524d9dca44388d.jpeg?h=630&w=1200&fit=crop&bg=999&crop=faces",
	// 	"publishedAt" : "2017-10-24T14:35:00Z",
	// 	"sentiment" : {
	// 		"probability" : {
	// 			"neg" : 0.4179142230123376,
	// 			"neutral" : 0.9467976219516799,
	// 			"pos" : 0.5820857769876624
	// 		},
	// 		"label" : "neutral"
	// 	}
	// },
	{
		"source" : {
			"id" : "AAPL",
			"name" : "Valuewalk.com"
		},
		"author" : "Michelle Jones",
		"title" : "Apple Inc. (AAPL) Stock Retreats After Yet Another Record High",
		"description" : "Apple Inc. (AAPL) stock is on track to snap its latest record run as sentiment shifted again early Wednesday. The Apple Inc. (AAPL) FQ4 2017 earnings release is due after closing bell on Thursday, and it seems investors don’t know […] The post Apple Inc. (AAP…",
		"url" : "http://www.valuewalk.com/2017/11/apple-inc-stock-retreats-after-yet-another-record-high/",
		"urlToImage" : "http://www.valuewalk.com/wp-content/uploads/2017/11/apple_logo_1509555461.jpg",
		"publishedAt" : "2017-11-01T17:39:46Z",
		"sentiment" : {
			"probability" : {
				"neg" : 0.5300062020522318,
				"neutral" : 0.5523736697153828,
				"pos" : 0.46999379794776813
			},
			"label" : "neutral"
		}
	},
	{
		"source" : {
			"id" : "AAPL",
			"name" : "Yahoo.com"
		},
		"author" : null,
		"title" : "Here’s How to Play the Dip In Apple Inc. Stock",
		"description" : "AAPL stock opened lower and continued sliding throughout the day, closing near its lows.  For starters, AAPL stock and the rest of the FANG gang experienced huge rallies during earnings season.  AAPL has now returned to a potential support level in the form o…",
		"url" : "https://finance.yahoo.com/news/play-dip-apple-inc-stock-160906308.html",
		"urlToImage" : "https://s.yimg.com/uu/api/res/1.2/ypSioqnnfd7gZYgDrtfdJA--~B/aD01MDA7dz01MDA7c209MTthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en-US/homerun/investorplace_417/ac05bb4f0e065f4c3b7fb1090f49f664",
		"publishedAt" : "2017-11-16T16:09:06Z",
		"sentiment" : {
			"probability" : {
				"neg" : 0.46051775646544124,
				"neutral" : 0.6309847443042332,
				"pos" : 0.5394822435345588
			},
			"label" : "neutral"
		}
	},
	{
		"source" : {
			"id" : "AAPL",
			"name" : "Macdailynews.com"
		},
		"author" : "MacDailyNews",
		"title" : "Apple shares hit new all-time intraday and closing highs",
		"description" : "Today in Nasdaq trading, shares of Apple Inc. (AAPL) rose to hit a new all-time…",
		"url" : "http://macdailynews.com/2017/11/06/apple-shares-hit-new-all-time-intraday-and-closing-highs-30/",
		"urlToImage" : null,
		"publishedAt" : "2017-11-06T21:36:18Z",
		"sentiment" : {
			"probability" : {
				"neg" : 0.4672330198614416,
				"neutral" : 0.6586186798758558,
				"pos" : 0.5327669801385584
			},
			"label" : "neutral"
		}
	},
]

class Content extends React.Component {
	constructor(props) {
		super(props)
		this.state = {searchText: props.searchText, tweets: [], stockname: ''}
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

			if (that.state.searchText === "Google" || that.state.searchText === "GOOGL") {
				if (that.state.tweets.length < 10) {
					//console.log(data);
					that.state.tweets.push(data);
					that.setState({stockname: 'GOOGL'});
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
					that.setState(that);
				}
			}
		});
	}

	render () {

		var notnull = articles !== null;
		var matching = false;
		if (notnull){
			if (articles[0].source.id === this.state.searchText)
				matching = true;
		}

		return (
				<div className='container-fluid'>
		          <div className='row' style={{marginTop:'1em'}}>
		            <div className='col-md-6'>
		              <h1>{this.state.searchText}</h1>
		            </div>
		            <div className='col-md-6'>
		              <Twitter tweetIDs='' tweets={this.state.tweets} />
		            </div>
		            <div className='col-md-6'>
		              {matching && <News articles={articles}/>}
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
