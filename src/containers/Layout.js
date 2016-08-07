import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'
import Header from '../components/Header.js'

class Layout extends Component {

  componentWillMount() {
    this.props.photos.length === 0 && this.props.getImages()
  }

  render() {
    return (
      <div>
        <Header title="Game of pairs"/>
        <div className="content">
          { this.props.children }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  photos: state.game.photos
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (Layout)
