import React from 'react'

export default ({title}) => {
  return (
    <header className="header-container">
      <div className="header" role="banner">
        <h1 className="header-title text-normal"><a href="">{title}</a></h1>
      </div>
    </header>
  )
}