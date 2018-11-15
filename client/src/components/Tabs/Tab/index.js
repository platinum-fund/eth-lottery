import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    image: PropTypes.string
  }

  onClick = () => {
    const { label, onClick } = this.props
    onClick(label)
  }

  render () {
    const {
      onClick,
      props: { activeTab, label, image }
    } = this

    let className = ''

    if (activeTab === label) {
      className = 'active'
    }

    return (
      <li className={className} onClick={onClick}>
        <img src={image} alt="" />
        <span>
          <i>{label}</i>
        </span>
      </li>
    )
  }
}

export default Tab
