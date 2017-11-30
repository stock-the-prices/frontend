import React from 'react'
import 'whatwg-fetch'

class Rating extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            stockname: this.props.stockname, rating: ""
        }
    }

    fetchData(){
    	console.log(this.props.stockname);
    const url = 'http://localhost:3000/api/rate' + this.props.stockname
    const that = this;
    fetch(url)
    .then(function(response) { 
    	return response.json()
    }).then(function(json) {
    	let rating = json.price_next_week / json.price_next_day;
    	if (rating > 1.05) rating = "A+";
    	else if (rating > 1.03) rating = "B+";
    	else if (rating > 1.01) rating = "C+";
    	else rating = "C-";
    	that.setState({stockname: json._id, rating: rating});
    })
    .catch(function(error) { console.log("Error", error) })
	}


    loadItems(page) {
        let self = this;
    }

    componentDidMount() {
    	this.fetchData();
    }
	render () {
        let articles = this.props.articles;
        let AAPL = (
            <div>

            <p>+ new product launches</p>
            <p>+ positive social media coverage</p>
            <p>+ positive trend</p>
            <p>- competitive market</p>
            </div>
        )

        let GOOGL = (
            <div>

            <p>+ new product launches</p>
            <p>- neutral social media converage</p>
            <p>- competitive market</p>
            </div>
        )

        let FB = (
            <div>

            <p>+ positive trend</p>
            <p>- recent scandals</p>
            </div>
        )

        let TST = (
            <div>

            <p>+ new product launches</p>
            <p>- neutral social media converage</p>
            <p>- competitive market</p>
            </div>
        )

        let content = {AAPL, GOOGL, FB, TST}

		return (
			<div>
            <div>
            	<h1>{this.state.stockname}</h1>
        	</div>
        	<div>
            	Rating: {this.state.rating}
                {content[this.state.stockname]}
            </div>
            </div>
		)
	}
}

export default Rating
