import React, {useState} from 'react';
import {Button, TextInput, View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {SEND_MESSAGE} from '../../utils/actions';

const Toolbar = ({addMessage, microPermissions}) => {
  const [messageText, setMessageText] = useState('');
  const dispatch = useDispatch();

  return (
    <View style={styles.toolbarWrapper}>
      <TextInput
        style={styles.textInput}
        value={messageText}
        onChangeText={text => setMessageText(text)}
      />
      <Button
        title="Send"
        disabled={messageText.length <= 0}
        onPress={() => {
          addMessage(messageText);
          dispatch({
            type: 'SEND_MESSAGE',
            payload: {
              text: messageText,
            },
          });
          setMessageText('');
        }}
      />
      <Button title="R" color={microPermissions ? 'green' : 'red'} />
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarWrapper: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    padding: 10,
  },
});

export default Toolbar;
