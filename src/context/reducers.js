const reducers = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'USER_TYPE_APPLICANT':
      return {
        ...state,
        isApplicant: true,
      };
    case 'USER_TYPE_COMPANY':
      return {
        ...state,
        isApplicant: false,
      };
    case 'ADD_JOB':
      return {
        ...state,
        jobs: [action.payload, ...state.jobs],
      };
    default:
      return state;
  }
};

export default reducers;
