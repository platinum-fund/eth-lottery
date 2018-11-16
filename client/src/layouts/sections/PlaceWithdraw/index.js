import React, { Component } from 'react'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import Button from 'components/Button'
import JoinButton from 'components/JoinButton'
import ContributionStat from './ContributionStat'
import iconWarning from 'assets/img/general/warning.svg'
import imgMetamask from 'assets/img/general/metamask.svg'
import imgMEW from 'assets/img/general/myetherwallet.svg'
import loader from 'assets/img/general/loader.svg'
import FundService from 'services/FundService'

class PlaceWithdraw extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      addressToCheck: '0XDB6827DE6B9FC722DC4EFA7E35F3B78C54932494',
      stat: []
    }
  }

  checkContribution = async e => {
    let stat

    e.preventDefault()
    this.setState({ isLoading: true, stat: [] })
    try {
      // for test use 0XDB6827DE6B9FC722DC4EFA7E35F3B78C54932494
      stat = await FundService.getContributionStat(
        '0x000000000000000000000000' + this.state.addressToCheck.slice(2)
      )
      this.setState({ isLoading: false, stat })
    } catch (e) {
      this.setState({ isLoading: false, stat: [] })
    }
  }

  render () {
    return (
      <section className="investc sec-pad rel" id="place">
        <div className="w1140 rel">
          <h2 className="main-title white tac margb-54">
            <FormattedMessage
              id="layouts.sections.placewithdraw.title1"
              defaultMessage="How to place ETH to OUR fund?"
            />
          </h2>
          <div className="row">
            <div className="col-1-2">
              <p className="white fz15">
                <FormattedMessage
                  id="layouts.sections.placewithdraw.invest"
                  defaultMessage="To make an investment in SMART HOLDER, transfer any amount of ETH to the address:"
                />
              </p>
            </div>
            <div className="col-1-2 tar">
              <p className="fz14 white lh24 marg-cust1">
                <FormattedMessage
                  id="layouts.sections.placewithdraw.recommended_gas"
                  defaultMessage="Recommended amount of gas"
                />{' '}
                - <b className="m-color">250000</b>
                <br />
                <FormattedMessage
                  id="layouts.sections.placewithdraw.check_gas_price"
                  defaultMessage="current gas price can be checked"
                />{' '}
                <a
                  className="gold-link m-color lh24"
                  href="http://ethgasstation.info"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  ethgasstation.info
                </a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-3-4">
              <div className="eth">
                <div className="eth__inn">
                  <span className="eth__text">
                    {process.env.REACT_APP_CONTRACT_ADDRESS}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-1-4 join">
              <JoinButton fullwidth={true} height="60px" size="14px" />
            </div>
          </div>

          <div className="row fz14 marg-b-40">
            <div className="col-7-12">
              <div className="flex-vcenter">
                <img
                  className="ahtung-marg"
                  src={iconWarning}
                  alt=""
                  width="35"
                />
                <span className="aht-red">
                  <FormattedMessage
                    id="layouts.sections.placewithdraw.transfer_warning"
                    defaultMessage="Transfers from exchanges are not allowed! Only from your personal ETH wallet."
                  />
                </span>
              </div>
            </div>
            <div className="col-5-12">
              <div className="flex-vcenter mob-d-block">
                <div className="paragf-style m0 lh-21">
                  <FormattedHTMLMessage
                    id="layouts.sections.placewithdraw.supported_wallets"
                    defaultMessage="Supported ETH-wallets"
                  />
                </div>
                <a
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img
                    className="img-marg-r-l-20"
                    src={imgMetamask}
                    alt=""
                    width="129"
                  />
                </a>
                <a
                  href="https://www.myetherwallet.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src={imgMEW} alt="" width="170" />
                </a>
              </div>
            </div>
          </div>
          <h2 className="main-title white tac mt120 margb-54">
            <FormattedMessage
              id="layouts.sections.placewithdraw.title2"
              defaultMessage="How to withdraw eth"
            />
          </h2>
          <div className="row">
            <div className="col-1-2">
              <p className="white lh-28">
                <FormattedHTMLMessage
                  id="layouts.sections.placewithdraw.send_eth"
                  defaultMessage="Send ANY ETH to the our fund address and receive your payment instantly:"
                />
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-3-4">
              <div className="eth">
                <div className="eth__inn">
                  <form className="formCheck" action="">
                    <input
                      id="checkFundsInput"
                      className="field"
                      type="text"
                      placeholder={process.env.REACT_APP_CONTRACT_ADDRESS}
                      onChange={e =>
                        this.setState({ addressToCheck: e.target.value })
                      }
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="col-1-4 join">
              <Button
                nature="primary"
                fullwidth={true}
                height="60px"
                size="14px"
                href="#"
                onClick={this.checkContribution}
              >
                <FormattedMessage
                  id="layouts.sections.placewithdraw.check_contribution"
                  defaultMessage="check contribution"
                />
              </Button>
            </div>
          </div>

          <div className="row">
            <div className="col-1-1">
              <img src={this.state.isLoading ? loader : ''} alt="" />
              <ContributionStat data={this.state.stat} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default PlaceWithdraw
