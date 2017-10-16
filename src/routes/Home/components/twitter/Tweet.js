var React = require('react');

class Tweet extends React.Component {
    render() {
        var tweet = this.props.tweet;
        return (
          <li className={"tweet" + (tweet.active ? ' active' : '')}>
            <img src={tweet.avatar} className="avatar"/>
            <blockquote>
              <cite>
                <a href={"http://www.twitter.com/" + tweet.screenname}>{tweet.author}</a>
                <span className="screen-name">@{tweet.screenname}</span>
              </cite>
              <span className="content">{tweet.body}</span>
            </blockquote>
          </li>
        )
    }
}

export default Tweet
