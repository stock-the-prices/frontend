import React from 'react'
import StockIcon from './StockIcon'

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


class StockCarousel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            stockList: props.stockList,
        }

        this.createStockIcon = this.createStockIcon.bind(this)
        this.onClickStockIcon = this.props.onClickStockIcon
    }

    componentWillReceiveProps(nextProps){
        if (this.props !== nextProps){
            this.setState({
                stockList: nextProps.stockList,
            })
        }
    }

    createStockIcon (stockInfo) {
        return (
            <StockIcon
                stockname={stockInfo.stockname}
                price={stockInfo.price}
            />)
    }

	render () {

        let stockList = this.state.stockList

		return (
            <div style={styles.wrapper}>
                {stockList.map(stockItem =>
                    <StockIcon
                        key={stockItem.stockname}
                        stockname={stockItem.stockname}
                        price={stockItem.price}
                    />)}
            </div>
		)
	}
}

export default StockCarousel
