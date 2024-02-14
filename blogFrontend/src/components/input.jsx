import React from 'react'

// use of forwARD REF HOOK

const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props
    }
){
    return <h1>Test</h1>
}, ref)

export default Input