import React from 'react'
import Tabs from 'components/Tabs'
import Button from 'components/Button'
import FirstImage from 'assets/img/general/fond1.svg'
import { FormattedHTMLMessage } from 'react-intl'

const AboutTabs = props => (
  <Tabs>
    <div label="Life quality" image={FirstImage}>
      <div className="w1140">
        <div className="row">
          <div className="col-1-2 rel">
            <img
              className="pictur-in-tab"
              src="static/img/general/bg-tab1.jpg"
              alt=""
            />
          </div>
          <div className="col-1-2">
            <FormattedHTMLMessage id="layouts.sections.about.tabs.first" />

            <div className="buttonss">
              <Button type="a" nature="light" margin="0 30px 0 0" href="#miss">
                OUR MISSION
              </Button>
              <Button
                type="a"
                nature="primary"
                target="_blank"
                href="https://etherscan.io/address/0x0a5155ad298ccfd1610a00ed75457eb2d8b0c701"
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div label="Croc">
      After 'while, <em>Crocodile</em>!
    </div>
    <div label="Sarcosuchus">
      Nothing to see here, this tab is <em>extinct</em>!
    </div>
  </Tabs>
)

AboutTabs.propTypes = {}

export default AboutTabs
