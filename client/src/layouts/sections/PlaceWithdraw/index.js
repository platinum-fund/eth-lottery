import React from 'react'

export default () => (
  <section className="investc sec-pad rel" id="place">
    <div className="w1140 rel">
      <h4 className="title-mini title-mini_mt0 white tac">
        How to place ETH to Smart Holder fund?
      </h4>
      <p className="white fz15">
        Send min 0.01 ETH to the Smart Holder smart contract fund
      </p>
      <div className="row">
        <div className="col-3-4">
          <div className="eth">
            <div className="eth__inn">
              <span className="eth__text">
                0x4390A19282c661c9eB8fFb47faCA7AD4b47D21fc
              </span>
              <a
                href="https://etherscan.io/address/0x4390A19282c661c9eB8fFb47faCA7AD4b47D21fc"
                target="_blank"
                className="button button_yl"
              >
                Join
              </a>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <p className="fz14 white lh24 marg-cust1">
            Recommended gas limit is: <b className="m-color">300000</b>, current
            gas price can be checked
            <a
              className="gold-link m-color lh24"
              href="http://ethgasstation.info"
              target="_blank"
            >
              ethgasstation.info
            </a>
          </p>
        </div>
      </div>
      <div className="row fz14 marg-b-40">
        <div className="col-7-12">
          <div className="flex-vcenter">
            <img
              className="ahtung-marg"
              src="static/img/general/ahtung.png"
              alt=""
              width="35"
            />
            <span className="aht-red">
              Transfer from exchange wallets isn’t allowed. Transfer is possible
              only from your personal ETH-wallet from which you have private
              keys.
            </span>
          </div>
        </div>
        <div className="col-5-12">
          <div className="flex-vcenter mob-d-block">
            <div className="paragf-style m0 lh-21">
              Supported
              <br />
              ETH-wallets
            </div>
            <a href="https://metamask.io/" target="_blank">
              <img
                className="img-marg-r-l-20"
                src="static/img/general/400px-Metamask.png"
                alt=""
                width="129"
              />
            </a>
            <a href="https://www.myetherwallet.com" target="_blank">
              <img
                src="static/img/general/myetherwallet-logo.png"
                alt=""
                width="170"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="image-lines tac">
        <div className="image-lines__lines image-lines__lines_v2" />
        <img src="static/img/general/pict3.png" alt="" width="103" />
      </div>
      <h4 className="title-mini title-mini_mt0 white tac">
        How to withdraw ETH from Smart Holder?
      </h4>
      <div className="row">
        <div className="col-1-2 rel">
          <img
            className="card1"
            src="static/img/general/card1.png"
            alt=""
            width="700"
          />
        </div>
        <div className="col-1-2">
          <p className="white lh-28 margb-54">
            Send <b className="m-color fz35">0 ETH</b> to the Smart Holder fund
            address and receive your payment instantly
          </p>
          <form className="form" action="">
            <input
              id="checkFundsInput"
              className="field field_minw346"
              type="text"
              placeholder="0x4390A19282c661c9eB8fFb47faCA7AD4b47D21fc"
            />
            <div
              id="checkFundsButton"
              className="button button_yl js-show-tabl1"
            >
              check contribution
            </div>
          </form>
          <table className="table" id="userFunds">
            <thead>
              <tr>
                <th>Deposit</th>
                <th>Accrued, %</th>
                <th>Withdrawn eth</th>
                <th>Left, %</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
      </div>
    </div>
  </section>
)
