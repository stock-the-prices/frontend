import React from 'react'

import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';
import yellow from 'material-ui/colors/yellow';
import grey from 'material-ui/colors/grey';
import green from 'material-ui/colors/green';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const colors = [
    {
        backgroundColor: grey[400]
    },
    {
        color: '#fff',
        backgroundColor: deepOrange[600]
    },
    {
        color: '#fff',
        backgroundColor: yellow[400]
    },
    {
        color: '#fff',
        backgroundColor: deepPurple[600]
    },
    {
        color: '#fff',
        backgroundColor: green[600]
    }
]

// stock icon:
// takes in stock name (e.g. AAPL) and clicking it searches the stock name
// takes in score evaluation? (can customize colour of avatar)
class StockIcon extends React.Component {

    componentDidMount(){
        this.forceUpdate()
    }

    render() {
        var stockname = this.props.stockname;
        var price = this.props.price;
        var index = this.props.index;
        var colorStyle = colors[index % 5];

        // something based on grade to determine backgroundColor; maybe?
        // var bgColor = ....

        return (
            <Chip
                avatar={<Avatar style={colorStyle} />}
                label={stockname + ' $' + price}
                style={{margin:10}}
                onClick={() => {this.props.onStockClick(stockname)}}
            />
        )
    }
}
export default StockIcon
