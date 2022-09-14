import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../utils/const';

const Message = ({message}) => {
  return (
    <View style={styles.message}>
      <Text>{message?.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    marginBottom: 20,
    backgroundColor: COLORS.LIGHT_GREY,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '80%',
  },
});

export default Message;
