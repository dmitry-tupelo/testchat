import {GET_MESSAGES_LIST, ADD_MESSAGE} from '../utils/actions';

let nextMessageId = 0;

export const addMessage = message => ({
  type: ADD_MESSAGE,
  id: nextMessageId++,
  message,
});

export const getMessagesList = messages => ({
  type: GET_MESSAGES_LIST,
  messages,
});
