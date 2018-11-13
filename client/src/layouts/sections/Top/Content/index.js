import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'components/Button'

import iconParticipants from 'assets/img/general/first-icon-part.svg'
import iconFund from 'assets/img/general/first-icon-fund.svg'
import iconDonated from 'assets/img/general/first-icon-donated.svg'
import iconPaid from 'assets/img/general/first-icon-paid.svg'
import iconTrans from 'assets/img/general/first-icon-trans.svg'

export default () => (
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
          About us
        </Button>
        <Button
          type="a"
          nature="primary"
          target="_blank"
          href={`https://etherscan.io/address/${
            process.env.REACT_APP_CONTRACT_ADDRESS
          }`}
        >
          Join
        </Button>
      </div>
    </div>
    <div className="double-b">
      <div className="row">
        <div className="col-1-3">
          <div className="about flex">
            <img className="about__icons" src={iconParticipants} alt="" />
            <div className="about__right">
              <p className="about__text">Participants</p>
              <p className="about__num">
                <span id="fundInvestors">0</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-1-3">
          <div className="about flex">
            <img className="about__icons" src={iconFund} alt="" />
            <div className="about__right">
              <p className="about__text">Fund balance</p>
              <p className="about__num">
                <span id="fundBalance">0</span> eth
              </p>
            </div>
          </div>
        </div>
        <div className="col-1-3">
          <div className="about flex">
            <img className="about__icons" src={iconDonated} alt="" />
            <div className="about__right">
              <p className="about__text">Donated to</p>
              <p className="about__num">
                <span id="fundCharity">0</span> eth
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-1-3">
          <div className="about flex">
            <img className="about__icons" src={iconPaid} alt="" />
            <div className="about__right">
              <p className="about__text">Paid to participants</p>
              <p className="about__num">
                <span id="fundPayed">0</span> eth
              </p>
            </div>
          </div>
        </div>
        <div className="col-2-3">
          <div className="about flex">
            <img className="about__icons mob-hide" src={iconTrans} alt="" />
            <div className="about__right flex">
              <div className="about__right1">
                <div className="about__text about__text_mb13">
                  Recent transactions
                  <p className="about__num">
                    <span id="fundTransactions">0</span> eth
                  </p>
                </div>
              </div>
              <div className="about__right2 df" id="fundTransactions">
                <div className="about__line">
                  <a
                    className="about__trans"
                    href="https://etherscan.io/tx/0x376e671b5e57884c03ba1257c2f729b26450e19133639ce4a68d2ab374a3e7b1"
                    target="_blank"
                  >
                    0x376e671b5e57884c03ba1257c2f729b26450e1
                  </a>
                </div>
                <div className="about__line">
                  <a
                    className="about__trans"
                    href="https://etherscan.io/tx/0x376e671b5e57884c03ba1257c2f729b26450e19133639ce4a68d2ab374a3e7b1"
                    target="_blank"
                  >
                    0x376e671b5e57884c03ba1257c2f729b26450e1
                  </a>
                </div>
                <div className="about__line">
                  <a
                    className="about__trans"
                    href="https://etherscan.io/tx/0x376e671b5e57884c03ba1257c2f729b26450e19133639ce4a68d2ab374a3e7b1"
                    target="_blank"
                  >
                    0x376e671b5e57884c03ba1257c2f729b26450e1
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
