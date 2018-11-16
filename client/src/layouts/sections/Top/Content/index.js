import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import JoinButton from 'components/JoinButton'
import Button from 'components/Button'
import Stat from '../Stat'

class Content extends Component {
  render () {
    return (
      <div className="w1140">
        <div className="top-sec__big-pad z8 rel">
          <p className="white title-v1">
            <FormattedMessage
              id="layouts.sections.top.content.title"
              default="Welcome to a financial system of the future"
            />
          </p>
          <div className="buttonss">
            <Button type="a" nature="flat" margin="0 30px 0 0" href="#how">
              <FormattedMessage id="about_us" defaultMessage="About us" />
            </Button>
            <JoinButton />
          </div>
        </div>
        <Stat />
      </div>
    )
  }
}

export default Content
