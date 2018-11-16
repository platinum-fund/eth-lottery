import React, { Component } from 'react'
import Tabs from 'components/TabsVertical'
import { injectIntl } from 'react-intl'
import FirstImage from 'assets/img/general/eye.svg'
import SecondImage from 'assets/img/general/deposit.svg'
import ThirdImage from 'assets/img/general/investor.svg'

class Mission extends Component {
  render () {
    const { intl } = this.props

    return (
      <section className="mission-sec sec-pad rel" id="mission">
        <div className="bord-bott bord-bott_top" />
        <div className="w1140">
          <h2 className="main-title white tac">
            {intl.formatMessage({ id: 'layouts.sections.mission.title' })}
          </h2>

          <Tabs>
            <div
              label={intl.formatMessage({
                id: 'layouts.sections.mission.one.title'
              })}
              labelUnder={intl.formatMessage({
                id: 'layouts.sections.mission.one.title.under'
              })}
              image={FirstImage}
            >
              <h4 className="title-mini white">
                {intl.formatMessage({
                  id: 'layouts.sections.mission.one.title'
                })}
              </h4>
              <p>
                {intl.formatMessage({
                  id: 'layouts.sections.mission.one.text'
                })}
              </p>
            </div>
            <div
              label={intl.formatMessage({
                id: 'layouts.sections.mission.two.title'
              })}
              labelUnder={intl.formatMessage({
                id: 'layouts.sections.mission.two.title.under'
              })}
              image={SecondImage}
            >
              <h4 className="title-mini white">
                {intl.formatMessage({
                  id: 'layouts.sections.mission.two.title'
                })}
              </h4>
              <p>
                {intl.formatMessage({
                  id: 'layouts.sections.mission.two.text'
                })}
              </p>
            </div>
            <div
              label={intl.formatMessage({
                id: 'layouts.sections.mission.three.title'
              })}
              labelUnder={intl.formatMessage({
                id: 'layouts.sections.mission.three.title.under'
              })}
              image={ThirdImage}
            >
              <h4 className="title-mini white">
                {intl.formatMessage({
                  id: 'layouts.sections.mission.three.title'
                })}
              </h4>
              <p>
                {intl.formatMessage({
                  id: 'layouts.sections.mission.three.text'
                })}
              </p>
            </div>
          </Tabs>
        </div>
      </section>
    )
  }
}

export default injectIntl(Mission)
