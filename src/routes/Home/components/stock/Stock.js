import React from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import spinner from './spinner.gif';

import io from 'socket.io-client'
let socket = io('http://localhost:3002');

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
            stockname: props.stockname.toUpperCase(),
            company: '',
            regularMarketPrice: 0,
            regularMarketTime: '',
            exchange: '',
            currency: '',
            marketChange: 0,
            rating: 50,
            nextDayPrice: 0,
            nextWeekPrice: 0,
            hasLoaded: false,
        }
    }

    fetchData(){
        if (this.state.stockname === null)
            return;
          const url = `http://localhost:3000/api/rate?stockId=${this.state.stockname}`
          const that = this;
          fetch(url)
          .then(function(response) {
            return response.json()
          }).then(function(json) {
            let rating = json.rating;

            let finalRating = 50;

            if (rating < 0)
                finalRating -= Math.abs(rating)*50;
            else if (rating > 0)
                finalRating += rating*50;


            let nextDayPrice = json.price_next_day.toFixed(2);
            let nextWeekPrice = json.price_next_week.toFixed(2);

            that.setState({rating: finalRating.toFixed(0), nextDayPrice, nextWeekPrice})
          })
          .catch(function(error) { console.log("Error", error) })
    }

    componentDidMount() {
        const that = this;

        socket.on('stockPriceInfo', function (data) {
            that.fetchData();
            that.setState(
                {
                    company: data.company,
                    regularMarketPrice: data.regularMarketPrice,
                    regularMarketTime: data.regularMarketTime,
                    exchange: data.exchange,
                    currency: data.currency,
                    marketChange: data.marketChange,
                    hasLoaded: true,
                }
            );
            that.setState(that);
        });

        socket.emit('getStockInfo', that.state.stockname.toUpperCase());
    }

    componentWillReceiveProps(nextProps){
        if (this.props !== nextProps){

            if ( (typeof nextProps.stockname !== 'undefined') && (nextProps.stockname.toUpperCase() !== this.state.stockname.toUpperCase()) ) {
                this.setState({
                    stockname: nextProps.stockname.toUpperCase(),
                    hasLoaded: false,
                })

                socket.emit('getStockInfo', nextProps.stockname.toUpperCase());
            }
        }
    }

    render() {

        // we want current stock price, company name, stock name, date
        var stockInfo = this.props.stockInfo
        var bgColor = (this.state.rating >= 50) ? green[200] : red[200];
        var upOrDown = (this.state.marketChange >= 0) ? "UP" : "DOWN";

        return (
            <div style={{marginBottom:'0.5em', height:'90%'}}>
                <Card style={styles.card}>
                    {this.state.hasLoaded && <div style={{width: '100%', display: 'flex'}}>
                        <div style={{width: '50%'}}>
                            <CardContent style={{paddingTop: '3em'}}>
                                <Typography type="display3" color="primary" component="h2">
                                    {this.state.exchange}:{this.state.stockname}
                                </Typography>
                                <Typography type="display3" color="primary" component="h3">
                                    {this.state.company}
                                </Typography>
                                <Typography type="display3" color="inherit" component="h3">
                                    {'$' + this.state.regularMarketPrice + ' ' + this.state.currency}
                                </Typography>
                                <Typography type="display2" color="accent" component="h3">
                                    {'(' + upOrDown + ' $' + this.state.marketChange.toFixed(2) + ')' }
                                </Typography>
                                <Typography type="headline" color="secondary" component="h3">
                                    {this.state.regularMarketTime}
                                </Typography>
                            </CardContent>
                        </div>
                        <div style={{width: '50%', paddingTop: '1em'}}>
                            <CardContent>
                                <Typography type="display3" color="primary" component="h2">
                                    Score
                                </Typography>

                                <Typography type="display4" color="accent" component="h2">
                                    <div style={{backgroundColor: bgColor, width: '1.3em', marginLeft: 'auto', marginRight: 'auto'}}>
                                        {this.state.rating}
                                    </div>
                                </Typography>

                                <Typography type="display3" color="primary" component="h2">
                                    Predictions
                                </Typography>

                                <Typography type="display1" color="accent" component="h2">
                                    {"Next Day: $" + this.state.nextDayPrice}
                                </Typography>

                                <Typography type="display1" color="accent" component="h2">
                                    {"Next Week: $" + this.state.nextWeekPrice}
                                </Typography>

                            </CardContent>
                        </div>
                    </div>}
                    {!this.state.hasLoaded && <img src={spinner}/>}
                </Card>
            </div>

        )
    }
}

export default Stock
