import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import colors from 'assets/css/partials/_variables.scss'

const Left = styled.div`
  text-align: right;
`

const Right = styled.div`
  padding-left: 10%;
`

const Title = styled.h2`
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
  color: ${colors['blueHeavyColor']};
`
const Header = styled.div`
  font-weight: bold;
  font-size: 20px;
`
const Percent = styled.div`
  font-size: 180px;
  font-weight: bold;
  font-style: italic;
  color: ${colors['blueHeavyColor']};

  & > span {
    font-weight: normal;
  }
`

const Rounded = styled.div`
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-block;
  outline: 0 none;
  text-decoration: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  border-radius: 5px;
  border-style: solid;
  border-width: 3px;
  border-color: ${colors['mainColor']};
  color: ${colors['blackColor']};
  text-align: center;
  height: auto;
  width: 250px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px 20px 10px 20px;
`

export default () => (
  <section className="conditions-sec sec-pad rel white-section" id="conditions">
    <FormattedMessage id="layouts.sections.conditions.title">
      {txt => <Title className="main-title tac">{txt}</Title>}
    </FormattedMessage>
    <br className="mob-hide" />
    <div className="w1140 black">
      <div className="row align-items-middle">
        <Left className="col-1-2 big-line-height align-self-bottom">
          <FormattedMessage id="layouts.sections.conditions.header">
            {txt => <Header>{txt}</Header>}
          </FormattedMessage>
          <FormattedMessage
            id="layouts.sections.conditions.text"
            values={{
              days: process.env.REACT_APP_TERM_IN_DAYS
            }}
          >
            {txt => <p>{txt}</p>}
          </FormattedMessage>
          <br />
        </Left>
        <Right className="col-1-2">
          <Percent>
            3<span>%</span>
          </Percent>
          <FormattedMessage
            id="percent.perday"
            values={{
              days: process.env.REACT_APP_TERM_IN_DAYS
            }}
          >
            {txt => <Rounded>{txt}</Rounded>}
          </FormattedMessage>
        </Right>
      </div>
    </div>
  </section>
)
