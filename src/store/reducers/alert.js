const INITIAL_STATE = {
  show: false,
  title: '',
  content: '',
  alertType: 'success',
};

export default function airports(state = INITIAL_STATE, action) {
  const { content, alertType } = action;

  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        show: true,
        content,
        alertType,
        title: action.title || '',
      };
    default:
      return state;
  }
}
