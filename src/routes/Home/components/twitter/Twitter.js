import React from 'react'
import TweetEmbed from 'react-tweet-embed'
import InfiniteScroll from 'react-infinite-scroller'
import Tweet from './Tweet'

class Twitter extends React.Component {
    constructor(props) {
        super(props)

        // props needs a list of tweet items that have
        // id, date (for sorting)
        //  {
        //      id: '235235234234'
        //      date: '2017-10-15T10:45:19+00:00'
        //
        this.state = {
            //tweetIDs: props.tweetIDs
            tweetIDs: ['650678375539974144', '672933969432870913', '650813687998074881', '650804521661243392']
        }
    }

    createTweet (tweetID, index) {
        return <TweetEmbed key={index} cards='hidden' conversation='none' id={tweetID} />;
    }

    loadMore() {
    }

	render () {
		// TODO: create a twitter component that displays
        // a stream of tweets
        // Description:
        //      scrollable list of tweets
        //      sorted chronologically

        //<TweetEmbed
        //    cards='hidden'
        //    conversation='none'
        //    id='650678375539974144'
        ///>

        let tweetIDs = this.state.tweetIDs;
        let tweetObjs = tweetIDs.map((tweetID, index) => // fulltweet obj
            this.createTweet(tweetID, index)
        );

        // custom tweet obj from props, waiting on stream
        // https://scotch.io/tutorials/build-a-real-time-twitter-stream-with-node-and-react-js
        //let content = this.props.tweets.map( (tweet) =>
        //    <Tweet key={tweet.twid} tweet={tweet} />
        //);

		return (
            <div style={{overflowY: 'scroll', height: '100%'}}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore{...this.loadMore()}
                    hasMore={false}
                    loader={<div className="loader">Loading ...</div>}
                    useWindow={false}
                >
                    {tweetObjs}
                </InfiniteScroll>
            </div>
		)
	}
}

export default Twitter
