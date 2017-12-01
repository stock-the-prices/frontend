import React from 'react'
import {Row, Col, Nav, NavItem, NavLink} from 'reactstrap'
import classnames from 'classnames'

class RangeSelector extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activePill: this.props.activePill
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle (pill) {
    if (this.state.activePill !== pill) {
      this.setState({
        activePill: pill
      })

      this.props.updateRange(pill)
    }
  }

  render () {
    return (
      <Row className='justify-content-sm-center'>
        <Col sm='12'>
          <Nav pills>
            <NavItem>
              <NavLink
                onClick={() => { this.toggle('0') }}
                className={classnames({ active: this.state.activePill === '0' })}
                >
                  All Time
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => { this.toggle('1') }}
                className={classnames({ active: this.state.activePill === '1' })}
                >
                  Last Year
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => { this.toggle('2') }}
                className={classnames({ active: this.state.activePill === '2' })}
                >
                  Last Month
                </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    )
  }
}

export default RangeSelector