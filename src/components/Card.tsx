import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Data} from '../types';

const Card = ({data}: {data: Data}) => {
  return (
    <View style={styles.card}>
      <Text>Title: {data.title}</Text>
      <Text>Body: {data.body}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    minHeight: 100,
    justifyContent: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    padding: 5,
  },
});
