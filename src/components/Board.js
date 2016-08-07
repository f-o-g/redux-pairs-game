import React, { Component, PropTypes } from 'react'
import PhotoCard from './PhotoCard'

const Board = ({
  suffledPhotos,
  flipCard,
  difficulty,
  mode,
  playersTurn
}) => {
  if(!difficulty || !mode) return <div></div>
  return (
    <div>
      <div className="flex align-content-center">
        <div>
          {
            suffledPhotos.map( (photo, i) =>
              <PhotoCard
                key={i}
                card={photo}
                flip={flipCard}
                playersTurn={playersTurn}
              />
            )
          }
        </div>
      </div>
    </div>

  )
}

Board.propTypes = {
  difficulty: PropTypes.string,
  mode: PropTypes.string,
  flipCard: PropTypes.func.isRequired,
  suffledPhotos: PropTypes.array.isRequired,
  playersTurn: PropTypes.number
}

export default Board
