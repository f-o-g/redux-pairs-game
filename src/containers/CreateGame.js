import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as actions from '../actions'
import {OptionButton, Button} from '../components/Buttons'

export default class CreateGame extends Component {
  static propTypes = {
    difficulty: PropTypes.string,
    mode: PropTypes.string,
    setMode: PropTypes.func.isRequired,
    setDifficultyLevel: PropTypes.func.isRequired,
    setNumOfPlayers: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired
  }

  render() {
    const {
      mode,
      difficulty,
      numOfPlayers,
      setMode,
      setDifficultyLevel,
      setNumOfPlayers,
      startGame,
      dispatch
    } = this.props
    return (
      <div className="flex justify-center">
        <div className="create-game-panel flex column align-items-center">
          <h3 className="text-bold">Game mode</h3>
          <div className="flex justify-center full" style={style.sectionTitle}>
            <OptionButton label="Single player" selected={ mode } type="single"
                    action={setMode} style={{...style.button, ...style.buttonMargin}}/>
            <OptionButton label="Multiplayer" selected={ mode } type="multi"
                    action={setMode} style={style.button}/>
          </div>
          {
            mode === 'multi' &&
            [
              <h3 className="text-bold">Number of players</h3>,
              <div className="flex justify-center full" style={style.sectionTitle}>
                <OptionButton label="2" selected={ numOfPlayers } type={2}
                        action={setNumOfPlayers} style={{...style.button, ...style.buttonMargin}}/>
                <OptionButton label="3" selected={ numOfPlayers } type={3}
                        action={setNumOfPlayers}  style={{...style.button, ...style.buttonMargin}}/>
                <OptionButton label="4" selected={ numOfPlayers } type={4}
                        action={setNumOfPlayers} style={{...style.button, ...style.buttonMargin}}/>
                <OptionButton label="5" selected={ numOfPlayers } type={5}
                        action={setNumOfPlayers} style={style.button}/>
              </div>
            ]
          }
          <h3 className="text-bold">Difficulty level</h3>
          <div className="flex justify-center full" style={style.sectionTitle}>
            <OptionButton label="Easy" selected={ difficulty } type='easy'
                    action={setDifficultyLevel} style={{...style.button, ...style.buttonMargin}}/>
            <OptionButton label="Intermediate" selected={ difficulty } type='intermediate'
                    action={setDifficultyLevel} style={{...style.button, ...style.buttonMargin}}/>
            <OptionButton label="Advanced" selected={ difficulty } type='advanced'
                    action={setDifficultyLevel} style={style.button}/>
          </div>
          <Button label="Start" type={!difficulty || !mode ? 'filled-disabled' : 'filled'}
                  action={() => {startGame() && dispatch(push('/play'))}} style={style.start}/>
        </div>
      </div>
    )
  }
}

const style = {
  buttonMargin: {
    marginRight: 10
  },
  button: {
    width: 180,
  },
  sectionTitle: {
    marginBottom: 20
  },
  start: {
    width: 300,
    marginTop: 40
  }
}

const mapStateToProps = (state) => ({
  difficulty: state.game.difficulty,
  mode: state.game.mode,
  numOfPlayers: state.game.numOfPlayers,
})

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)