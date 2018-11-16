import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CollapseItem from './Item'

class Collapse extends Component {
  static propTypes = { children: PropTypes.instanceOf(Array).isRequired }

  constructor (props) {
    super(props)

    this.state = { activeItem: this.props.children[0].props.title }
  }

  onClickItem = item => {
    this.setState({ activeItem: item })
  }

  render () {
    const {
      onClickItem,
      props: { children },
      state: { activeItem }
    } = this

    return (
      <div className="faq-carusel">
        {children.map(child => {
          const { title, text } = child.props

          return (
            <CollapseItem
              activeItem={activeItem}
              key={title}
              title={title}
              text={text}
              onClick={onClickItem}
            />
          )
        })}
      </div>
    )
  }
}

export default Collapse
