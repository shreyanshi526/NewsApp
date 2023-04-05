import React, { Component } from 'react'
import Ghost from './Ghost.gif'

export class Spin extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Ghost} alt="ghost" />
      </div>
    )
  }
}

export default Spin