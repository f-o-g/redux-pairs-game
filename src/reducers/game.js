import {LOAD_IMAGES, SET_DIFFICULTY_LEVEL, FLIP_CARD,
  SET_MODE, SET_NUM_OF_PLAYERS, START_GAME} from '../actions'

const numberOfPairs = {
  easy: 8,
  intermediate: 16,
  advanced: 24
}

const nextPlayer = (currPlayer, numOfPlayers, pairsMatched) => {
  if(pairsMatched) return currPlayer
  return currPlayer < numOfPlayers ? currPlayer + 1 : 1
}

const newScore = (playerScore, pairsMatched) => {
  if(!pairsMatched) return playerScore
  return playerScore !== undefined ? playerScore + 1 : 1
}

const shuffle = (array) => {
  let currentIndex = array.length

  while (0 !== currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    const temp = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temp
  }

  return array
}

const initialState = {
  finishedGame: false,
  photosReady: false,
  photos: [],
  suffledPhotos: [],
  knownCards: new Set(),
  seenCards: [],
  difficulty: undefined,
  mode: undefined,
  rounds: 0,
  onMovement: false,
  pairSelected: undefined,
  cardSelected: undefined,
  playersTurn: undefined,
  numOfPlayers: 2,
  score: {}
}

const game = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_IMAGES:
      return {
        ...state,
        photos: action.photos,
        photosReady: true
      }
    case START_GAME:
      return {
        ...state,
        ...initialState,
        photos: state.photos,
        photosReady: state.photosReady,
        suffledPhotos: shuffle(state.photos.slice(0, numberOfPairs[state.difficulty])),
        difficulty: state.difficulty,
        mode: state.mode,
        playersTurn: state.playersTurn,
        numOfPlayers: state.numOfPlayers
      }
    case SET_DIFFICULTY_LEVEL:
      return {
        ...initialState,
        photos: state.photos,
        photosReady: state.photosReady,
        difficulty: action.difficulty,
        mode: state.mode,
        playersTurn: state.playersTurn,
        numOfPlayers: state.numOfPlayers
      }
    case SET_MODE:
      return {
        ...initialState,
        photos: state.photos,
        photosReady: state.photosReady,
        mode: action.mode,
        playersTurn: action.mode === 'multi' ? 1 : undefined,
        difficulty: state.difficulty
      }
    case SET_NUM_OF_PLAYERS:
      return {
        ...state,
        numOfPlayers: action.numOfPlayers
      }
    case FLIP_CARD:
      const pairsMatched = action.pairId === state.pairSelected
      const newSuffledPhotos = state.suffledPhotos.map( m => {
        // Show the selected card
        if(m.id === action.id) return { ...m, flipped: true, discovered: state.pairSelected === m.pairId }
        // Change the pair of the card that matched to selected
        if(m.pairId === state.pairSelected && pairsMatched) return {...m, discovered: true}
        // Leave the card of this turn turned up
        if(m.id === state.cardSelected) return m
        return { ...m, flipped: false }
      })

      const basicState = {
        ...state,
        finishedGame: newSuffledPhotos.filter( m => m.discovered).length === state.suffledPhotos.length,
        knownCards: state.knownCards.add(action.id),
        seenCards: [ ...state.seenCards, action.id ],
        rounds: state.onMovement ? state.rounds + 1 : state.rounds,
        onMovement: !state.onMovement,
        cardSelected: state.cardSelected === undefined ? action.id : undefined,
        pairSelected: state.pairSelected === undefined ? action.pairId : undefined,
        suffledPhotos: newSuffledPhotos
      }

      // Multiplayer
      if(state.mode === 'multi') {
        return {
          ...basicState,
          playersTurn: state.onMovement ? nextPlayer(action.player, state.numOfPlayers, pairsMatched) : state.playersTurn,
          score: {
            ...state.score,
            [action.player]: newScore(state.score[action.player], pairsMatched)
          }
        }
      }

      return basicState
    default:
      return state
  }
}

export default game
