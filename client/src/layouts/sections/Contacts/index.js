import React from 'react'
import styled from 'styled-components'
import colors from 'assets/css/partials/_variables.scss'
import { FormattedMessage } from 'react-intl'
import iconMail from 'assets/img/general/mail.svg'
import iconTelegram from 'assets/img/general/tg.svg'

const ContactDescr = styled.div`
  padding-left: 20px;
  text-align: left;

  & > span {
    color: ${colors['blueHeavyColor']};
    font-size: 14px;
    display: block;
  }

  & > a {
    color: ${colors['blackColor']};
    font-size: 14px;
    font-weight: bold;
  }
`

export default () => (
  <section className="contacts-sec sec-pad rel white-section" id="contacts">
    <FormattedMessage id="layouts.sections.contacts.title">
      {txt => <h2 className="main-title tac">{txt}</h2>}
    </FormattedMessage>
    <br className="mob-hide" />
    <br className="mob-hide" />
    <div className="w1140 black">
      <div className="row align-items-middle">
        <div className="col-1-4" />
        <div className="col-1-4 tac">
          <div className="flex join-center">
            <img src={iconMail} alt="" />
            <ContactDescr>
              <span>e-mail</span>
              <a href="#">support@email.com</a>
            </ContactDescr>
          </div>
        </div>
        <div className="col-1-4 tac">
          <div className="flex join-center">
            <img src={iconTelegram} alt="" />
            <ContactDescr>
              <span>telegram</span>
              <a href="#">tgchannel</a>
            </ContactDescr>
          </div>
        </div>
        <div className="col-1-4" />
      </div>
    </div>
  </section>
)
