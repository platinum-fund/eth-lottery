import React from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Button from 'components/Button'

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
        <div className="col-1-2">
          <FormattedHTMLMessage id="layouts.sections.how.header" />
          <FormattedMessage id="layouts.sections.how.text">
            {txt => <p>{txt}</p>}
          </FormattedMessage>
          <br />
          <Button nature="primary" href="#">
            Join
          </Button>
        </div>
        <div className="col-1-2 fz0">
          <iframe
            title="video"
            width="460"
            height="320"
            src="https://www.youtube.com/embed/ilLowhZYa6g"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  </section>
)
