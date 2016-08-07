import React from 'react'

export const OptionButton = ({label, type, selected, action, style, disabled}) => {
    return (
      <div style={style}>
        <button className={`button ${selected === type ? 'bordered-selected' : 'bordered'}`}
                onClick={() => action(type)} disabled={disabled}>
          {label}
        </button>
      </div>
    )
}

export const Button = ({label, type, action, style}) => {
  return (
    <div style={style}>
      <button className={`button ${type}`} onClick={action}>
        {label}
      </button>
    </div>
  )
}