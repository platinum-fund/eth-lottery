import React from 'react'
import { FormattedMessage } from 'react-intl'
import imgPie from 'assets/img/general/pie.svg'

export default () => (
  <section className="fond-sec white-section sec-pad" id="distribution">
    <div className="w1140">
      <h2 className="main-title tac black-c">
        <FormattedMessage
          id="layouts.sections.distribution.title"
          defaultMessage="Fund distribution"
        />
      </h2>
      <br className="mob-hide" />
      <br className="mob-hide" />
      <br className="mob-hide" />
      <br />
      <div className="row mob-reverse">
        <div className="col-1-2 m-tac pie">
          <img src={imgPie} alt="" />
        </div>
        <div className="col-auto">
          <div className="fz15 black-c lh26">
            <FormattedMessage
              id="layouts.sections.distribution.text"
              defaultMessage="Transparency of process of the funds distribution – advantage of fund and an indicator of a social maturity of the organization. Participation of each member in the SMAT HOLDER social fund of the funds distribution is not only receiving of a stable profit on safe conditions. It also the high social standards established by fund. As you can see from the chart is lower, SMART HOLDER gives the chance to change life to the best to many needing people, transferring a part of funds for charity."
            />
          </div>
          <div className="h50" />
          <div className="percent-container">
            <div className="row">
              <div className="col-1-5">
                <div className="percent red">&nbsp;</div>
              </div>
              <div className="col-auto">
                <span className="value">
                  95<i>%</i>
                </span>{' '}
                <FormattedMessage
                  id="layouts.sections.distribution.for_participants"
                  defaultMessage="are distributed between participants"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-1-5">
                <div className="percent orange">&nbsp;</div>
              </div>
              <div className="col-auto">
                <span className="value">
                  3<i>%</i>
                </span>{' '}
                <FormattedMessage
                  id="layouts.sections.distribution.for_participants"
                  defaultMessage="for marketing and promotion"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-1-5">
                <div className="percent blue">&nbsp;</div>
              </div>
              <div className="col-auto">
                <span className="value">
                  2<i>%</i>
                </span>{' '}
                <FormattedMessage
                  id="layouts.sections.distribution.for_team"
                  defaultMessage="team"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
