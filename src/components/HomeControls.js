import React, { Component, PropTypes } from 'react'
import { Button } from './Buttons'

const HomeControls = ({startGame}) => {
  return (
    <div className="flex justify-center">
      <div className="home-buttons flex column">
        <Button label="Start" type="filled" action={startGame} style={style.start}/>
        <Button label="Replay" type="bordered" action={() => {}} style={style.replay}/>
      </div>
    </div>
  )
}


HomeControls.propTypes = {
  startGame: PropTypes.func.isRequired
}

const style = {
  start: {
    width: 300
  },
  replay: {
    width: 300,
    marginTop: 15
  }
}

export default HomeControls