import React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import JoinButton from 'components/JoinButton'

export default () => (
  <section className="how-sec sec-pad rel white-section" id="how">
    <div className="bord-bott bord-bott_top">
      <div className="bord-bott__arrow" />
    </div>
    <FormattedMessage id="layouts.sections.how.title">
      {txt => <h2 className="main-title tac">{txt}</h2>}
    </FormattedMessage>
    <br className="mob-hide" />
    <br className="mob-hide" />
    <br className="mob-hide" />
    <div className="w1140 black">
      <div className="row">
        <div className="col-1-5" />
        <div className="col-3-5 align-center">
          <FormattedHTMLMessage id="layouts.sections.how.header" />
          <FormattedMessage id="layouts.sections.how.text">
            {txt => <p>{txt}</p>}
          </FormattedMessage>
          <br />
          <JoinButton className="how-sec-join" width="30%" />
        </div>
      </div>
    </div>
  </section>
)
