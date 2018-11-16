import React, { Component } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'

const Answer = posed.div({
  open: { height: 'auto', opacity: 1, flip: true },
  closed: { height: '1px', opacity: 0, flip: true }
})

class CollapseItem extends Component {
  static propTypes = {
    activeItem: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string
  }

  onClick = () => {
    const { title, onClick } = this.props
    onClick(title)
  }

  render () {
    const {
      onClick,
      props: { activeItem, title, text }
    } = this

    let className = 'faq-carusel__item'
    let isOpen = activeItem === title

    if (isOpen) {
      className += ' active'
    }

    return (
      <div className={className}>
        <div className="faq-carusel__q" onClick={onClick}>
          {title}
          <div className="faq-carusel__arrow" />
        </div>
        <Answer pose={isOpen ? 'open' : 'closed'} className="faq-carusel__a">
          {text}
        </Answer>
      </div>
    )
  }
}

export default CollapseItem
