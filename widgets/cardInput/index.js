import React, { useContext, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, TextInput, View } from 'react-native';
import { useKeyboard } from '../../hooks/useKeyboard';
import themeContext from '../../themes/theme';
import { useCardStore } from '../../state/useCardStore';

const CardInput = ({ cardSettings }) => {
  const [opacity] = useState(new Animated.Value(0));
  const [onFocus, setOnFocus] = useState(false);
  const { cardState, setCardName, cardColorLight, cardColorDark, cardColorIsDark } = useCardStore();

  const cardStateName = cardState.cardName;
  const placeholderInput = cardSettings ? cardStateName : 'Business Name?';

  const handleOnFocus = () => {
    setOnFocus(true);
  };

  Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <View style={styles.main}>
      {onFocus ? null : <Animated.Text style={[styles.indicator, { opacity }]}>|</Animated.Text>}
      <TextInput
        onChangeText={setCardName}
        placeholder={placeholderInput}
        placeholderTextColor={cardColorIsDark ? cardColorLight : cardColorDark}
        onFocus={handleOnFocus}
        autoFocus={Platform == 'ios' ? true : null}
        style={[
          styles.input,
          { color: cardColorIsDark ? cardColorLight : cardColorDark, fontSize: 24 },
        ]}
      />
    </View>
  );
};

export default CardInput;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginStart: 20,
  },
  input: {
    padding: 10,
    borderRadius: 40,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
  },
  indicator: {
    fontSize: 42,
    fontWeight: 'bold',
  },
});
