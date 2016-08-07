import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Board from '../components/Board'
import Stats from '../components/Stats'
import MultiPlayer from '../components/MultiPlayer'
import Result from '../components/Result'
import * as actions from '../actions'


const winner = (score) => {
  if(!Object.keys(score).length) return
  return Object.keys(score).reduce((prev, curr) => {
    const prevScore = score[prev] || 0
    const currScore = score[curr] || 0
    return currScore > prevScore ? curr : prev
  })
}

class Game extends Component {
  static propTypes = {
    difficulty: PropTypes.string,
    photos: PropTypes.array.isRequired,
    photosReady: PropTypes.bool.isRequired,
    score: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if(!this.props.difficulty || !this.props.mode) {
      this.props.dispatch(push('/'))
    }
  }

  render() {
    const {
      photosReady, suffledPhotos, difficulty, mode,
      rounds, knownCards, finishedGame, flipCard,
      playersTurn, numOfPlayers, score, dispatch
    } = this.props

    if (!photosReady) {
      return <div><h4 className="text-center">Loading game...</h4></div>
    }

    const totalPairs = suffledPhotos.length / 2
    const matchedPairs = suffledPhotos.filter(photo => photo.discovered).length / 2
    const faceUp = knownCards.size - 2 * matchedPairs
    
    return (
      <div style={{paddingTop: 50}}>
        {
          finishedGame && mode === 'multi' &&
            <Result score={score} />
        }
        <Stats
          mode={mode}
          difficulty={difficulty}
          rounds={rounds}
          totalPairs={totalPairs}
          matchedPairs={matchedPairs}
          faceUp={faceUp}
          playersTurn={playersTurn}
          numOfPlayers={numOfPlayers}
        />
        {
          mode === 'multi' &&
          <MultiPlayer
            score={score}
            playersTurn={playersTurn}
            numOfPlayers={numOfPlayers}
          />
        }

        <Board
          suffledPhotos={suffledPhotos}
          flipCard={flipCard}
          mode={mode}
          difficulty={difficulty}
          playersTurn={playersTurn}
        />

        <div className="flex justify-center" style={{padding: 20}}>
          <div>
            <button className={`button filled`} onClick={() => dispatch(push('/create-game'))}>
              New game
            </button>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  photos: state.game.photos,
  photosReady: state.game.photosReady,
  difficulty: state.game.difficulty,
  suffledPhotos: state.game.suffledPhotos,
  rounds: state.game.rounds,
  knownCards: state.game.knownCards,
  seenCards: state.game.seenCards,
  finishedGame: state.game.finishedGame,
  mode: state.game.mode,
  playersTurn: state.game.playersTurn,
  numOfPlayers: state.game.numOfPlayers,
  score: state.game.score
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
