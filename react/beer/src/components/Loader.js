import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Loader = (props) => (
  <div className="loader">
    <img src='/images/ball.svg' alt='loading'/>
  </div>
)
Loader.propTypes = {
  message:PropTypes.string
}
export default Loader

