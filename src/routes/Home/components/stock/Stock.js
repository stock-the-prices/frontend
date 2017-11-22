import React from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import io from 'socket.io-client'

import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';

const styles = {
  card: {
    height: '100%',
    width: '98%',
    position: 'relative',
  },
  media: {
    maxHeight: 250,
  },
  actions: {
    position: 'absolute',
    bottom: 0,
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


// <CardMedia
//     style={styles.media}
//     image="http://www.ehypermart.in/0/images/frontend/image-not-found.png"
// />

class Stock extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            stockname: props.stockname,
            company: '',
            regularMarketPrice: 0,
            regularMarketTime: '',
        }
    }

    componentDidMount() {
        const that = this;
        const socket = io('http://localhost:3002');

        socket.on('stockPriceInfo', function (data) {
            console.log("got data back!");
            console.log(data);
            that.setState(
                {
                    company: data.company,
                    regularMarketPrice: data.regularMarketPrice,
                    regularMarketTime: data.regularMarketTime,
                }
            );
            that.setState(that);
        });

        socket.emit('getStockInfo', that.state.stockname);
    }

    render() {

        // we want current stock price, company name, stock name, date
        var stockInfo = this.props.stockInfo

        return (
            <div style={{marginBottom:'0.5em', height:'90%'}}>
                <Card style={styles.card}>
                    <CardContent>
                        <Typography type="display3" component="h2">
                            {this.state.stockname}
                        </Typography>
                        <Typography type="display1" component="h3">
                            {this.state.company}
                        </Typography>
                        <Typography type="display1" component="h3">
                            {'$' + this.state.regularMarketPrice}
                        </Typography>
                        <Typography type="subheading" component="h3">
                            {this.state.regularMarketTime}
                        </Typography>
                    </CardContent>
                    <CardActions style={styles.actions}>
                        <Button dense color="primary">
                            Share
                        </Button>
                        <Button dense color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </div>

        )
    }
}

export default Stock
