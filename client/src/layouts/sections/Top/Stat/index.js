import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import FundService from 'services/FundService'

import iconParticipants from 'assets/img/general/first-icon-part.svg'
import iconFund from 'assets/img/general/first-icon-fund.svg'
import iconDonated from 'assets/img/general/first-icon-donated.svg'
import iconPaid from 'assets/img/general/first-icon-paid.svg'
import iconTrans from 'assets/img/general/first-icon-trans.svg'
import loader from 'assets/img/general/loader.svg'
import posed from 'react-pose'

const TransList = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 700 } }
})

class Stat extends Component {
  constructor (props) {
    super(props)
    this.state = this.initialState
  }

  async componentDidMount () {
    let stat

    try {
      stat = await FundService.getStatistics()

      this.setState({ ...stat, ...{ isLoading: false } })
    } catch (e) {
      this.setState(this.initialState)
    }
  }

  initialState = {
    totalInvestors: 0,
    fundBalance: 0,
    donated: 0,
    paid: 0,
    recentTransactions: [],
    sumTransactions: 0,
    isLoading: true
  }

  statisticsParam = param =>
    this.state.isLoading ? <img src={loader} alt="" /> : this.state[param]

  transactionsList = () => {
    if (this.state.recentTransactions[0]) {
      let txns = this.state.recentTransactions.map(txn => {
        return (
          <div className="about__line" key={txn.hash}>
            <a
              className="about__trans"
              href={txn.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {txn.hash}
            </a>
          </div>
        )
      })
      return (
        <div className="about__right2 df" id="fundTransactions">
          {txns}
        </div>
      )
    } else return <span />
  }

  render () {
    return (
      <div className="double-b">
        <div className="row">
          <div className="col-1-3">
            <div className="about flex">
              <img className="about__icons" src={iconParticipants} alt="" />
              <div className="about__right">
                <p className="about__text">
                  <FormattedMessage
                    id="participants"
                    defaultMessage="Participants"
                  />
                </p>
                <p className="about__num">
                  <span id="fundInvestors">
                    {this.statisticsParam('totalInvestors')}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-1-3">
            <div className="about flex">
              <img className="about__icons" src={iconFund} alt="" />
              <div className="about__right">
                <p className="about__text">
                  <FormattedMessage
                    id="fund_balance"
                    defaultMessage="Fund balance"
                  />
                </p>
                <p className="about__num">
                  <span id="fundBalance">
                    {this.statisticsParam('fundBalance')}
                  </span>{' '}
                  eth
                </p>
              </div>
            </div>
          </div>
          <div className="col-1-3">
            <div className="about flex">
              <img className="about__icons" src={iconDonated} alt="" />
              <div className="about__right">
                <p className="about__text">
                  <FormattedMessage
                    id="donated_to"
                    defaultMessage="Donated to"
                  />
                </p>
                <p className="about__num">
                  <span id="fundCharity">
                    {this.statisticsParam('donated')}
                  </span>{' '}
                  eth
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
                <p className="about__text">
                  <FormattedMessage
                    id="paid_to_participants"
                    defaultMessage="Paid to participants"
                  />
                </p>
                <p className="about__num">
                  <span id="fundPayed">{this.statisticsParam('paid')}</span> eth
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
                    <FormattedMessage
                      id="recent_transactions"
                      defaultMessage="Recent transactions"
                    />
                    <p className="about__num">
                      <span id="fundTransactions">
                        {this.statisticsParam('sumTransactions')}
                      </span>{' '}
                      eth
                    </p>
                  </div>
                </div>
                <TransList pose={this.state.isLoading ? 'hidden' : 'visible'}>
                  {this.transactionsList()}
                </TransList>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stat
