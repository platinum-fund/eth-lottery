import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

const items = [
  { link: '#how', label: 'How does it works', id: 'menu.how_does_it_works' },
  { link: '#mission', label: 'Mission', id: 'menu.mission' },
  { link: '#conditions', label: 'Conditions', id: 'menu.conditions' },
  { link: '#place', label: 'Place/withdraw', id: 'menu.place' },
  { link: '#distribution', label: 'Distribution', id: 'menu.distribution' },
  { link: '#faq', label: 'FAQ', id: 'menu.faq' },
  { link: '#contacts', label: 'Contact', id: 'menu.contact' }
]

const Nav = props => {
  const listItems = items.map(({ link, label, id }) => (
    <a key={link} href={link} className={`${props.type}__link`}>
      <FormattedMessage id={id} defaultMessage={label} />
    </a>
  ))
  return <nav className={`${props.type}`}>{listItems}</nav>
}

Nav.propTypes = { type: PropTypes.string }

Nav.defaultProps = { type: '' }

export default Nav
