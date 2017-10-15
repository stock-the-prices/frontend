import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

export const HomeView = (props) => (
	<div className='container-fluid'>
    <div className='row'>
      <div className='col-md-6'>
        <h1>component 1</h1>
      </div>
      <div className='col-md-6'>
        <h1>component 2</h1>
      </div>
      <div className='col-md-6'>
        <h1>component 3</h1>
      </div>
      <div className='col-md-6'>
        <h1>component 4</h1>
      </div>
    </div>
  </div>
)

export default HomeView
