import React, { useState, useEffect } from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { getCurrencySymbol } from 'helpers/format'

export default function AmountInput({
  currency,
  value,
  onChange,
  onEnter,
  onBlur,
  onFocus,
  onKeyDown,
  ...rest
}) {
  const [expression, setExpression] = useState(value || '')
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (!focused) setExpression(value)
  }, [value, focused])

  const sym = currency ? getCurrencySymbol(currency) : null

  const formattedValue =
    new Intl.NumberFormat('ru', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) || ''

  const calc = str => {
    try {
      let computed = eval(str.replace(/[-+*/]*$/g, '').replace(/^[+*/]*/g, ''))
      return computed || computed === 0 ? computed : ''
    } catch (error) {
      return value
    }
  }

  const actions = {
    onChange: e => {
      const cleaned = e.target.value
        .replace(/[^0-9,.+\-/*]/g, '')
        .replace(/,/g, '.')
      setExpression(cleaned)
      if (calc(cleaned) !== value) onChange(calc(cleaned))
    },
    onFocus: e => {
      setFocused(true)
      if (onFocus) onFocus(e)
    },
    onBlur: e => {
      setFocused(false)
      if (onBlur) onBlur(e)
    },
    onKeyDown: e => {
      if (onEnter && e.keyCode === 13) onEnter(calc(expression))
      if (onKeyDown) onKeyDown(e)
    },
  }

  return (
    <TextField
      value={focused ? expression : formattedValue}
      variant="outlined"
      inputProps={{ type: 'tel' }}
      InputProps={{
        endAdornment: sym && <InputAdornment position="end" children={sym} />,
      }}
      {...actions}
      {...rest}
    />
  )
}