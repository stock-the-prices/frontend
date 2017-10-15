import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

class PageLayout extends React.Component {
  constructor (props) {
    super(props) 
  }
  
  render () {
    return (
      <div className='root text-center'>
        <div className='content-area page-layout__viewport'>
          {this.props.children}
        </div>
      </div>
      )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
