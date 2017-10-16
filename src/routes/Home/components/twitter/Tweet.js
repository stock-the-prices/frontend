import React from 'react'

class Tweet extends React.Component {

    render() {
        var tweet = this.props.tweet;
        return (
            <div>
                <img src={tweet.user.profile_image_url} className="avatar"/>
                <blockquote>
                  <cite>
                    <a href={"http://www.twitter.com/" + tweet.user.screen_name}>{tweet.user.screen_name}</a>
                    <span className="screen-name">@{tweet.user.screen_name}</span>
                  </cite>
                  <span className="content">{tweet.text}</span>
                </blockquote>
            </div>
        )
    }


}



export default Tweet
