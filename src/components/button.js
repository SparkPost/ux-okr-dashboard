import React from "react"

function Button(props) {
  const { children, ...rest } = props

  return (
    <button
      {...rest}
      style={{ border: "none", background: "transparent", cursor: "pointer" }}
    >
      {children}
    </button>
  )
}

export default Button
