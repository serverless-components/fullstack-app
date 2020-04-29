import React, { Component } from 'react'
import styles from './Notification.module.css'

export default class Notification extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {}

  render() {
    return (
      <div className={`${styles.container} ${this.props.className || ''}`}>
        <div className={`${styles.containerInner}`}>
          { this.props.notification }
        </div>
      </div>
    )
  }
}