import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Message from './Message';

const MessagesList = ({messagesList}) => {
  const renderMessage = ({item}) => {
    return <Message message={item} />;
  };

  // add to FlatList initialScrollIndex={messagesList.length - 1} to scroll to the bottom
  return (
    <View style={styles.messagesList}>
      <FlatList
        keyExtractor={item => item?.id}
        data={messagesList}
        renderItem={renderMessage}
        extraData={messagesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  messagesList: {
    flex: 1,
  },
});
export default MessagesList;
