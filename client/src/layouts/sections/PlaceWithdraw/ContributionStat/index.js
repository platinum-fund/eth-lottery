import React from 'react'
import PropTypes from 'prop-types'

const ContributionStat = props => {
  const { data } = props

  if (data[0])
    return (
      <table className="table" id="userFunds">
        <thead>
          <tr>
            <th>Депозит</th>
            <th>Начислено, %</th>
            <th>Выведено eth</th>
            <th>Осталось, %</th>
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
