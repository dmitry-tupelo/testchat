import {SEND_MESSAGE, SET_MESSAGES_LIST} from '../utils/actions';

const nextMessageId = messages => {
  const maxId = messages.reduce((maxId, message) => {
    return Math.max(message.id, maxId);
  }, -1);
  return maxId + 1;
};

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGES_LIST':
      return {
        ...state,
        messages: action?.payload,
      };
    case 'SEND_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: nextMessageId(state?.messages),
            title: action?.payload?.text,
          },
        ],
      };

    default:
      return state;
  }
};
