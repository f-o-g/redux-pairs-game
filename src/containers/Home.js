import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import HomeControls from '../components/HomeControls'
import * as actions from '../actions'

class Home extends Component {
  static propTypes = {
    getImages: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  startGame = () => {
    this.props.getImages()
    this.props.dispatch(push('/create-game'))
  }

  render() {
    return <HomeControls startGame={this.startGame} />
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps) (Home)

