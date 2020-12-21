import React, { useState, useContext, useReducer } from 'react';

const AlertContext = React.createContext();
// Сложный подход, слишком много компонентов
// const AlertToggleContext = React.createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};
// Сложный подход, слишком много компонентов
// export const useAlertToggle = () => {
//   return useContext(AlertToggleContext);
// };

const SHOW_ALERT = 'show';
const HIDE_ALERT = 'hide';

const reducer = (state, action) => {
  switch (action.type) {
    case 'show': return {...state, visible: true, text: action.text};
    case 'hide': return {...state, visible: false, text: action.text};
    default: return state;
  }
};

export const AlertProvider = ({ children }) => {
  // const [alert, setAlert] = useState(false);
  // const toggleAlert = () => setAlert(prev => !prev);

  // Переписываем логику alert на useReducer
  const [state, dispatch] = useReducer(reducer, {
    visible: false,
    text: ''
  });

  const show = text => dispatch({ type: SHOW_ALERT, text });
  const hide = text => dispatch({ type: HIDE_ALERT, text });

  return (
    <AlertContext.Provider value={{
      visible: state.visible,
      show,
      hide,
      text: state.text
    }}>
      {/* <AlertToggleContext.Provider value={toggleAlert}> */}
      { children }
      {/* </AlertToggleContext.Provider> */}
    </AlertContext.Provider>
  )
}