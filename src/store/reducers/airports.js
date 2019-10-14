const INITIAL_STATE = {
  data: [],
};

export default function airports(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_AIRPORTS':
      return { ...state, data: action.airports };
    default:
      return state;
  }
}
