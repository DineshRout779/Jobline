import { createContext, useContext, useEffect, useReducer } from 'react';
import reducers from './reducers';
import { jobs } from '../data';

const AppContext = createContext();

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: false,
  isApplicant: true,
  jobs: [...jobs],
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);

  useEffect(() => {
    if (state.user) {
      if (!state.user.hasOwnProperty('jobs')) {
        dispatch({ type: 'USER_TYPE_APPLICANT' });
      } else {
        dispatch({ type: 'USER_TYPE_COMPANY' });
      }
    }

    if (state.user) {
      if (!JSON.parse(localStorage.getItem('user'))) {
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
