import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import MessagesList from './MessagesList';
import Toolbar from './Toolbar';
import {useSelector, useDispatch} from 'react-redux';
import {
  createTable,
  getChatItems,
  getDBConnection,
  saveChatMessages,
} from '../../utils/db';
import {CHAT_MESSAGES} from '../../utils/const';
import {checkMicrophone} from '../../utils/lib';

const Chat = () => {
  const dispatch = useDispatch();
  const [messagesDb, setDbMessages] = useState([]);
  const [microPermissions, setMicroPermissions] = useState(false);

  const getMessagesList = async () => {
    const request = await fetch(CHAT_MESSAGES);
    const result = await request.json();
    return result;
  };

  const loadDataCallback = useCallback(async () => {
    try {
      const initMessages = await getMessagesList();
      const db = await getDBConnection();
      await createTable(db);
      const storedMessages = await getChatItems(db);
      if (storedMessages.length) {
        setDbMessages(storedMessages);
        dispatch({type: 'SET_MESSAGES_LIST', payload: initMessages});
      } else {
        await saveChatMessages(db, initMessages);
        setDbMessages(initMessages);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  useEffect(() => {
    Platform.OS === 'android'
      ? checkMicrophone()
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          })
      : setMicroPermissions(true);
  }, []);

  const addMessage = async newMessage => {
    if (!newMessage.trim()) {
      return;
    }
    try {
      const newMessageArr = [
        ...messagesDb,
        {
          id:
            messagesDb.reduce((acc, cur) => {
              if (cur.id > acc.id) {
                return cur;
              }
              return acc;
            }).id + 1,
          title: newMessage,
        },
      ];
      setDbMessages(newMessageArr);
      const db = await getDBConnection();
      await saveChatMessages(db, newMessageArr);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.chatWrapper}>
      <MessagesList messagesList={messagesDb} />
      <Toolbar addMessage={addMessage} microPermissions={microPermissions} />
    </View>
  );
};

const styles = StyleSheet.create({
  chatWrapper: {
    flex: 1,
  },
});

export default Chat;
