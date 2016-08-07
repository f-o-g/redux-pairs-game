import React, { Component, PropTypes } from 'react'

const getWinners = (score) => {
  if(!Object.keys(score).length) return

  let winners = []
  let maxScore = 0
  Object.keys(score).forEach((e, i) => {
    if(score[e] > maxScore) {
      winners = [e]
      maxScore = score[e]
    } else if(score[e] === maxScore) {
      winners.push(e)
    }
  })
  return ({ winners, maxScore })
  // Need to check if draw - multiple winners
  // const winner = Object.keys(score).reduce((prev, curr) => {
  //   const prevScore = score[prev] || 0
  //   const currScore = score[curr] || 0
  //   return currScore > prevScore ? curr : prev
  // })
}

const Result = ({score}) => {
  const {winners} = getWinners(score)
  // const {maxScore} = getWinners(score)
  return (
    <div>
      <div className="flex column align-items-center">
        {
          // Single winner
          winners.length === 1 &&
          [
            <div>
              {winners.map((winner, i) => {
                return <h3 key={i}>Player {winner} wins!</h3>
              }) }
            </div>
            // <h5>{maxScore} pairs matched</h5>
          ]
        }
        {
          winners.length > 1 &&
          [
            <h3>Draw</h3>,
            <div>
              { winners.map((winner, i) => {
                return <span key={i} style={{padding: 5}}>Player {winner}</span>
              })}
            </div>
            // <h5>{maxScore} pairs matched each</h5>
          ]
        }
      </div>
    </div>

  )
}

Result.propTypes = {
  score: PropTypes.object
}

export default Result