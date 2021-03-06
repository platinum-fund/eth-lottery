import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tab from './Tab'

class Tabs extends Component {
  static propTypes = { children: PropTypes.instanceOf(Array).isRequired }

  constructor (props) {
    super(props)

    this.state = { activeTab: this.props.children[0].props.label }
  }

  onClickTabItem = tab => {
    this.setState({ activeTab: tab })
  }

  render () {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab }
    } = this

    return (
      <div className="tabs_block">
        <ul className="tabs">
          {children.map(child => {
            const { label, image } = child.props

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                image={image}
                onClick={onClickTabItem}
              />
            )
          })}
        </ul>
        <div className="box visible">
          {children.map(child => {
            if (child.props.label !== activeTab) return undefined
            return child.props.children
          })}
        </div>
      </div>
    )
  }
}

export default Tabs
