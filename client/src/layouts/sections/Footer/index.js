import React from 'react'
import logo from 'assets/img/logo1.svg'
import Nav from 'layouts/Nav'
import DropdownLanguage from 'layouts/DropdownLanguage'

export default props => (
  <div className="page__footer">
    <footer className="footer">
      <div className="row align-justify w1140">
        <div className="header__mob-show-menu">
          <button className="hamburger hamburger--slider">
            <span
              className="hamburger-box"
              onClick={() => props.toggleMobileMenu()}
            >
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
        <div className="flex-menu">
          <a className="logo" href="/">
            <img
              src={logo}
              className="logo-vect"
              width="29"
              height="21"
              alt=""
            />
          </a>
          <Nav type="nav-top" className="flex" />
        </div>
        <div className="language-drop">
          <DropdownLanguage color="black" down={false} />
        </div>
      </div>
    </footer>
  </div>
)
