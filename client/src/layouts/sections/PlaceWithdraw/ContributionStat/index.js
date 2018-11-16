import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

const ContributionStat = props => {
  const { data } = props

  if (data[0])
    return (
      <table className="table" id="userFunds">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="deposit" defaultMessage="Deposit" />
            </th>
            <th>
              <FormattedMessage id="accrued" defaultMessage="Accrued" />, %
            </th>
            <th>
              <FormattedMessage id="withdrawn" defaultMessage="Withdrawn" />,
              ETH
            </th>
            <th>
              <FormattedMessage id="remains" defaultMessage="Remains" />, %
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(stat => {
            const {
              depositNumber,
              deposit,
              currenctPercent,
              allWithdraw,
              percentPayed
            } = stat.tx

            return (
              <tr key={depositNumber}>
                <td>{deposit} eth</td>
                <td>{currenctPercent} %</td>
                <td>{allWithdraw} eth</td>
                <td>{percentPayed} %</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  else return <span />
}

ContributionStat.propTypes = {
  data: PropTypes.array
}

ContributionStat.defaultProps = {
  data: []
}

export default ContributionStat
