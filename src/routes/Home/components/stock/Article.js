import React from 'react'
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';

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
    minWidth: 151,
    minHeight: 151,
  },
};

const colors = [
    {
        backgroundColor: red[200]
    },
    {
        backgroundColor: green[200]
    }
]



class Article extends React.Component {

    render() {
        var article = this.props.article;

        var hasAuthor = article.author !== null

        var img = (article.urlToImage !== null) ? article.urlToImage : "http://www.ehypermart.in/0/images/frontend/image-not-found.png"

        var isNeutral = (article.sentiment.label === "neutral");
        var isPositive = (article.sentiment.label === "pos");

        var col = (isPositive) ? green[100] : red[100];

        if (isNeutral)
            col = 'white'

        return (
            <div style={{marginBottom:'0.5em'}}>
                <Card style={styles.card}>
                    <CardMedia
                        style={styles.cover}
                        image={img}
                    />
                    <div style={styles.details}>
                        <CardContent style={{flex: '1 0 auto', backgroundColor: col}}>
                            <Typography type="subheading" align="left">
                                <cite>
                                <a href={article.url}>{article.title}</a>
                                {hasAuthor && <span style={{color:"grey"}}className="screen-name">{' - By ' + article.author}</span>}
                                <span style={{color:"grey"}}className="screen-name">{' @ ' + article.source.name + ' - '}</span>
                                {!isNeutral && !isPositive && <span style={{color: red[500]}}className="screen-name">Negative Sentiment</span>}
                                {isNeutral && <span style={{color: 'grey'}}className="screen-name">Neutral Sentiment</span>}
                                {isPositive && <span style={{color: green[500]}}className="screen-name">Positive Sentiment</span>}
                                </cite>
                            </Typography>
                            <Typography type="body2" color="secondary" align="left">
                                <span className="content">{'\n' + article.description}</span>
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Article
