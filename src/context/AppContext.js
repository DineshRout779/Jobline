import { createContext, useContext, useEffect, useReducer } from 'react';
import { jobs } from '../data';
import reducers from './reducers';

const AppContext = createContext();

const INITIAL_STATE = {
  user: {
    id: 1,
    name: 'Amazon',
    email: 'amazon@gmail.com',
    desc: 'A frontend web developer',
    jobs: [
      {
        id: 4,
        title: 'Full Stack Web Developer',
        company: 'BigBinary',
        position: 'Senior Software Enginner',
        jobType: 'Full-time',
        applicants: [],
        location: 'remote',
      },
      {
        id: 5,
        title: 'Front End Web Developer',
        company: 'Netflix',
        position: 'Junior Software Enginner',
        jobType: 'Full-time',
        applicants: [],
        location: 'remote',
      },
    ],
    location: 'Los Angeles, CA',
  },
  error: false,
  isApplicant: false,
  jobs: [...jobs],
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);

  useEffect(() => {
    if (state.user.hasOwnProperty('jobs')) {
      dispatch({ type: 'USER_TYPE_COMPANY' });
    } else {
      dispatch({ type: 'USER_TYPE_APPLICANT' });
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
