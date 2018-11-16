import React, { Component } from 'react'
import Collapse from 'components/Collapse'
import { injectIntl } from 'react-intl'

class Faq extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { intl } = this.props

    return (
      <section className="faq-sec rel gray-section" id="faq">
        <div className="w1140">
          <h2 className="main-title tac black-c">Faq</h2>
          <Collapse>
            <div
              title={intl.formatMessage({ id: 'layouts.sections.faq.one.q' })}
              text={intl.formatMessage({ id: 'layouts.sections.faq.one.a' })}
            />
            <div
              title={intl.formatMessage({ id: 'layouts.sections.faq.two.q' })}
              text={intl.formatMessage({ id: 'layouts.sections.faq.two.a' })}
            />
            <div
              title={intl.formatMessage({ id: 'layouts.sections.faq.three.q' })}
              text={intl.formatMessage({ id: 'layouts.sections.faq.three.a' })}
            />
            <div
              title={intl.formatMessage({ id: 'layouts.sections.faq.four.q' })}
              text={intl.formatMessage({ id: 'layouts.sections.faq.four.a' })}
            />
            <div
              title={intl.formatMessage({ id: 'layouts.sections.faq.five.q' })}
              text={intl.formatMessage(
                {
                  id: 'layouts.sections.faq.five.a'
                },
                {
                  term_percent: process.env.REACT_APP_TERM_PERCENT,
                  term_days: process.env.REACT_APP_TERM_IN_DAYS
                }
              )}
            />
          </Collapse>
        </div>
      </section>
    )
  }
}

export default injectIntl(Faq)
