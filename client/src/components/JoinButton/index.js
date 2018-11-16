import React from 'react'
import Button from 'components/Button'
import PropTypes from 'prop-types'

const link = `https://etherscan.io/address/${
  process.env.REACT_APP_CONTRACT_ADDRESS
}`

const JoinButton = props => {
  const { nature, ...rest } = props

  return (
    <Button
      {...rest}
      nature={props.nature}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      Join
    </Button>
  )
}

JoinButton.propTypes = {
  nature: PropTypes.string
}

JoinButton.defaultProps = {
  nature: 'primary'
}

export default JoinButton
