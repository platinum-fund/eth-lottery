import React, { Component } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import ConnectedIntlProvider from './providers/ConnectedIntlProvider'

import Nav from 'layouts/Nav'
import TopSection from './layouts/sections/Top'
import HowSection from './layouts/sections/How'
import MissionSection from './layouts/sections/Mission'
import ConditionsSection from './layouts/sections/Conditions'
import PlaceWithdrawSection from './layouts/sections/PlaceWithdraw'
import ContactsSection from './layouts/sections/Contacts'
import Footer from './layouts/sections/Footer'

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
              <HowSection />
              <MissionSection />
              <ConditionsSection />
              <PlaceWithdrawSection />
              <ContactsSection />
            </section>
            <Footer toggleMobileMenu={() => handleToggleMobileMenu()} />
          </React.Fragment>
        </ConnectedIntlProvider>
      </Provider>
    )
  }
}

export default App
