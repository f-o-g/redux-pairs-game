import React, { Component, PropTypes } from 'react'

const Stats = ({
  totalPairs,
  matchedPairs,
  faceUp,
  rounds,
  difficulty,
  mode
}) => {
  if (!difficulty || !mode) return <div></div>
  return (
    <div className="border-dev">
      <div className="flex">
        <div className="cell container">
          <div className="card">
            <h5 className="text-center">Rounds: </h5>
            <h2 className="text-center">{rounds}</h2>
          </div>
        </div>
        <div className="cell container">
          <div className="card">
            <h5 className="text-center">Total pairs: </h5>
            <h2 className="text-center">{totalPairs}</h2>
          </div>
        </div>
        <div className="cell container">
          <div className="card">
            <h5 className="text-center">Matched pairs: </h5>
            <h2 className="text-center">{matchedPairs}</h2>
          </div>
        </div>
        <div className="cell container">
          <div className="card">
            <h5 className="text-center">Faced-up cards: </h5>
            <h2 className="text-center">{faceUp}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

Stats.propTypes = {
  difficulty: PropTypes.string,
  mode: PropTypes.string,
  rounds: PropTypes.number.isRequired,
  totalPairs: PropTypes.number.isRequired,
  matchedPairs: PropTypes.number.isRequired,
  faceUp: PropTypes.number.isRequired,
}

export default Stats
