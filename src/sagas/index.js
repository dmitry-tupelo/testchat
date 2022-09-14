import {takeEvery, takeLatest, take, put, call} from 'redux-saga/effects';
import {CHAT_MESSAGES} from '../utils/const';

const getMessagesList = async () => {
  const request = await fetch(CHAT_MESSAGES);
  const result = await request.json();
  return result;
};

export function* sendMessageWorker() {}

export function* watchSendMessage() {
  yield takeEvery('SEND_MESSAGE', sendMessageWorker);
}

export function* watchLoadMessagesList() {
  yield take('SET_MESSAGES_LIST');
  const messages = yield call(getMessagesList);

  yield put({type: 'SET_MESSAGES_LIST', payload: messages});
}

export default function* rootSaga() {
  yield watchLoadMessagesList();
  yield watchSendMessage();
}
