import React, { Component, PropTypes } from 'react'

const MultiPlayer = ({numOfPlayers, playersTurn, score}) => {
  return (
    <div className="flex">
      {
        Array.from({length: numOfPlayers}, (v, k) => k + 1).map((m, i) => {
          const textColor = m === playersTurn ? '#fff' : '#333'
          return (
            <div key={i} className=" cell border-dev container">
              <div className="card" style={{backgroundColor: m === playersTurn ? '#2c8' : '#eee' }}>
                <h3 className="text-center" style={{color: textColor}}>Player {m}</h3>
                <h1 className="text-center text-huge" style={{color: textColor}}>{score[m] || 0}</h1>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

MultiPlayer.propTypes = {
  playersTurn: PropTypes.number,
  numOfPlayers: PropTypes.number,
  score: PropTypes.object
}

export default MultiPlayer
