import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    labelUnder: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    image: PropTypes.string
  }

  onClick = () => {
    const { label, labelUnder, onClick } = this.props
    onClick(label)
  }

  render () {
    const {
      onClick,
      props: { activeTab, label, image, labelUnder }
    } = this

    let className = ''

    if (activeTab === label) {
      className = 'active'
    }

    return (
      <li className={className} onClick={onClick}>
        <div className="tabs__round">
          <img src={image} alt="" />
        </div>
        <div className="tabs__right">
          <span className="tabs__text-dec">{label}</span>
          <div className="tabs__text-li">{labelUnder}</div>
        </div>
      </li>
    )
  }
}

export default Tab
