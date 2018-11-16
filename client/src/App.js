import React, { Component } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import ConnectedIntlProvider from './providers/ConnectedIntlProvider'
import ScrollableAnchor from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'

import Nav from 'layouts/Nav'
import TopSection from './layouts/sections/Top'
import HowSection from './layouts/sections/How'
import MissionSection from './layouts/sections/Mission'
import ConditionsSection from './layouts/sections/Conditions'
import PlaceWithdrawSection from './layouts/sections/PlaceWithdraw'
import DistributionSection from './layouts/sections/Distribution'
import FaqSection from './layouts/sections/Faq'
import ContactsSection from './layouts/sections/Contacts'
import Footer from './layouts/sections/Footer'

configureAnchors({ offset: -60, scrollDuration: 200 })

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showMobileMenu: false
    }
  }

  render () {
    const { store, messages } = this.props

    const handleToggleMobileMenu = () => {
      this.setState({ showMobileMenu: !this.state.showMobileMenu })
      return this.state.showMobileMenu
    }

    return (
      <Provider store={store}>
        <ConnectedIntlProvider messages={messages}>
          <React.Fragment>
            <div className="layer-mob pc-hide" />
            <div
              className={`pc-hide aside-menu-mob ${
                this.state.showMobileMenu ? 'active' : ''
              }`}
            >
              <Nav type="nav-mob" />
            </div>
            <section className="page__wrapper rel">
              <TopSection toggleMobileMenu={() => handleToggleMobileMenu()} />
              <ScrollableAnchor id={'how'}>
                <HowSection />
              </ScrollableAnchor>
              <ScrollableAnchor id={'mission'}>
                <MissionSection />
              </ScrollableAnchor>
              <ScrollableAnchor id={'conditions'}>
                <ConditionsSection />
              </ScrollableAnchor>
              <ScrollableAnchor id={'place'}>
                <PlaceWithdrawSection />
              </ScrollableAnchor>
              <ScrollableAnchor id={'distribution'}>
                <DistributionSection />
              </ScrollableAnchor>
              <ScrollableAnchor id={'faq'}>
                <FaqSection />
              </ScrollableAnchor>
              <ScrollableAnchor id={'contacts'}>
                <ContactsSection />
              </ScrollableAnchor>
            </section>
            <Footer toggleMobileMenu={() => handleToggleMobileMenu()} />
          </React.Fragment>
        </ConnectedIntlProvider>
      </Provider>
    )
  }
}

export default App
