import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Article from './Article'

class News extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            articles: this.props.articles,
            stockname: this.props.stockname,
        }
    }

    createArticleObj (articleInfo, index) {
        return <Article key={index} id={articleInfo.id} article={articleInfo} />;
    }

    loadItems(page) {
        let self = this;
    }

	render () {
        let articles = this.props.articles;
        let content = articles.map((article, index) =>
            this.createArticleObj(article, index)
        );

		return (
            <div style={{overflowY: 'scroll', height: '100%'}}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadItems.bind(this)}
                    hasMore={false}
                    loader={<div className="loader">Loading ...</div>}
                    useWindow={false}
                >
                    {content}
                </InfiniteScroll>
            </div>
		)
	}
}

export default News
