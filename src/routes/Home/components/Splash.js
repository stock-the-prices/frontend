import React from 'react'
import './HomeView.scss'

import StockIcon from './carousel/StockIcon'

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


let stockList = [
    {
        stockname: 'AAPL',
        price: '20.00',
    },
    {
        stockname: 'GOOGL',
        price: '30.00',
    },
    {
        stockname: 'FB',
        price: '40.00',
    },
	{
		stockname: 'TST',
		price: '415.00',
	}
]

// this should be the main page
// shown when entering website for first time OR search text = '', that is, searching an empty field
class Splash extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			stockList: stockList,
		}
	}

	notifyStockIconClick(stockname) {
		this.props.onClickStockIcon(stockname)
		this.forceUpdate();
	}

	render () {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-6'>
						<h1>Go Search Something</h1>
					</div>
					<div className='col-md-6'>
						<div style={styles.wrapper}>
							{this.state.stockList.map((stockItem, index) =>
								<StockIcon
									key={index}
									index={index}
									stockname={stockItem.stockname}
									price={stockItem.price}
									onStockClick={this.props.onClickStockIcon}
								/>)}
						</div>
					</div>
				</div>
			</div>

			)
	}
}

export default Splash
