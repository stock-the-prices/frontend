import React from 'react'

import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: 90,
    minHeight: 40,
  },
};

class Tweet extends React.Component {

    render() {
        var tweet = this.props.tweet;
        console.log(tweet);

        return (
            <div style={{marginBottom:'0.5em'}}>
                <Card style={styles.card}>
                    <CardMedia
                        style={styles.cover}
                        image={tweet.user.profile_image_url}
                    />
                    <div style={styles.details}>
                        <CardContent style={styles.content}>
                            <Typography type="subheading" align="left">
                                <cite>
                                <a href={"http://www.twitter.com/" + tweet.user.screen_name}>{tweet.user.screen_name}</a>
                                <span> @{tweet.user.screen_name}</span>
                                </cite>
                            </Typography>
                            <Typography type="body2" color="secondary" align="left">
                                <a style={{color: 'rgb(139,0,139)'}} href={"http://www.twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str}>
                                    <span className="content">{tweet.text}</span>
                                </a>
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>
        )
    }


}

export default Tweet
