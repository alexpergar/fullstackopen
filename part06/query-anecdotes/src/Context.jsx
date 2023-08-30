import { createContext, useReducer, useContext } from "react"


const notifReducer = (state, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return action.payload
    case 'CLEAR_MESSAGE':
      return ''
    default:
      return state
  }
}

const Context = createContext()

export const ContextProvider = (props) => {
  const [notification, notifDispatch] = useReducer(notifReducer, '')

  return (
    <Context.Provider value={[notification, notifDispatch]}>
      {props.children}
    </Context.Provider>
  )
}

export const useNotifValue = () => {
  const notifAndDispatch = useContext(Context)
  return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(Context)
  return notifAndDispatch[1]
}

export default Context