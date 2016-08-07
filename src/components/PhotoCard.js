import React, { Component, PropTypes } from 'react'

const PhotoCard = ({
  card,
  flip,
  playersTurn
}) => {
  return (
    <div className="card-container">
      <div className={`flipper ${card.flipped || card.discovered ? 'flipped' : ''}`}>
        <div className="front" onClick={() => flip({ id: card.id, pairId: card.pairId, player: playersTurn})}></div>
        <div className="back"><img src={card.photoUrl}/></div>
      </div>
    </div>
  )
}

PhotoCard.propTypes = {
  card: PropTypes.object.isRequired,
  flip: PropTypes.func.isRequired,
  playersTurn: PropTypes.number
}

export default PhotoCard
