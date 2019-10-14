const INITIAL_STATE = {
  width: 0,
  searchDialog: true,
};

export default function airports(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_WIDTH':
      return { ...state, width: action.width };
    case 'SET_SEARCH_DIALOG':
      return { ...state, searchDialog: action.searchDialog };
    default:
      return state;
  }
}
