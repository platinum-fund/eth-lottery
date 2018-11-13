import React from 'react'
import Header from './Header'
import Tabs from './Tabs'

const About = props => (
  <section className="about-sec" id="about">
    <div className="bord-bott">
      <div className="bord-bott__arrow" />
    </div>
    <Header />
    <Tabs />
  </section>
)

About.propTypes = {}

export default About
