import React from 'react'
import 'whatwg-fetch'
import {Line, defaults} from 'react-chartjs-2'
import RangeSelector from './rangeSelector'

function createDataSet (dataArray) {
  return [{
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'red',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 5.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'black',
    pointBackgroundColor: 'red',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'white',
    pointHoverBorderColor: 'red',
    pointHoverBorderWidth: 2,
    pointRadius: 0,
    pointHitRadius: 10,
    data: dataArray
  }]
}

class Rating extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
          stockname: this.props.stockname, rating: "", json: null, arr: null, activePill: '0',
      }

      this.updateRange = this.updateRange.bind(this)
    }

    updateRange (pill) {
      let prices = this.state.json.prices
      let arr

      // filter the range of the dataset
      if ( pill == '0') { // all time
        arr = prices.slice(0, prices.length)
      } else if ( pill == '1' ) { // last year
        arr = prices.slice(prices.length-365, prices.length)
      } else { // last month
        arr = prices.slice(prices.length-30, prices.length)
      }

      this.setState({activePill: pill, arr})

    }

    fetchData(){
      const url = `http://localhost:3000/api/rate?stockId=${this.props.stockname}`
      const that = this;
      fetch(url)
      .then(function(response) {
      	return response.json()
      }).then(function(json) {
      	let rating = json.price_next_week / json.price_next_day;


        let prices = json.prices
        let arr = prices.slice(0, prices.length)

        that.setState({stockname: json._id, rating: rating, arr, json})
        console.log(json)
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
    let content

    if ( this.state.arr !== null ) {
      let arr = this.state.arr
      let data = {
        labels: arr.map(x=>x.date),
        datasets: createDataSet(arr.map(x=>x.price))
      }

      data = Object.assign(data, defaults)
      data.global.legend.display = false

      content = ( <div style={{marginTop: '1em'}}>
                    <Line data={data}/>
                  </div>
            )
    }

		return (
			<div style={{overflowY: 'scroll'}}>
              	<div>
                  <h3> Historical Stock Price</h3>
                  <RangeSelector activePill={this.state.activePill} updateRange={this.updateRange} />
                  {content}
                </div>
             </div>
		)
	}
}

export default Rating
