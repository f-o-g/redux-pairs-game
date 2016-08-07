import { push } from 'react-router-redux'

export const LOAD_IMAGES = 'LOAD_IMAGES'
export const SET_DIFFICULTY_LEVEL = 'SET_DIFFICULTY_LEVEL'
export const FLIP_CARD = 'FLIP_CARD'
export const START_GAME = 'START_GAME'
export const SET_MODE = 'SET_MODE'
export const SET_NUM_OF_PLAYERS = 'SET_NUM_OF_PLAYERS'

const API = 'https://api.eyeem.com/v2/'
const ENDPOINT = 'photos/popular'
const CLIENT_ID = 'P90rwnWXzCrvyO7wEAFJ9tmo7XaCnoz9'

export const loadImages = (photos) => ({
  type: LOAD_IMAGES,
  photos
})

export const startGame = () => ({
  type: START_GAME
})

export const setDifficultyLevel = (difficulty) => ({
  type: SET_DIFFICULTY_LEVEL,
  difficulty
})

export const setMode = (mode) => ({
  type: SET_MODE,
  mode
})

export const setNumOfPlayers = (numOfPlayers) => ({
  type: SET_NUM_OF_PLAYERS,
  numOfPlayers
})

export const flipCard = ({id, pairId, player}) => ({
  type: FLIP_CARD,
  id,
  pairId,
  player
})

export const getImages = () => (dispatch, getState) => {
  fetch(`${API}${ENDPOINT}?client_id=${CLIENT_ID}&limit=40`)
    .then((response) =>  {
      if(response.ok) {
        response.json().then(function(json) {
          let cards = []
          json.photos.items
            .filter( f => (f.width >= f.height))
            .forEach( (m, i) => {
            cards.push({
              id: i * 2,
              pairId: m.id,
              photoUrl: m.photoUrl,
              flipped : false,
              discovered : false
            })
            cards.push({
              id: i * 2 + 1,
              pairId: m.id,
              photoUrl: m.photoUrl,
              flipped : false,
              discovered : false
            })
          })

          return dispatch(loadImages(cards))
        })
      } else {
        console.log('Network response was not ok.')
      }
    })
    .catch(function(error) {
      console.log(`There has been a problem: ${error.message}`)
    })
}
