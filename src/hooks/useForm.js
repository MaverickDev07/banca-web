import { useState } from 'react'

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const active = activeEvent => {
    setValues(activeEvent)
  }

  const reset = () => {
    setValues(initialState)
  }

  const handleInputChange = ({ target }) => {
    // console.log(target.name, ' <-> ', target.value)
    setValues({
      ...values,
      [target.name]: target.value,
    })
  }

  return [values, handleInputChange, active, reset]
}
