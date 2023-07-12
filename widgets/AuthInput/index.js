import React, { useContext, useRef, useState } from 'react';
import {
  Animated, Platform, StyleSheet, TextInput, View
} from 'react-native';
import { useKeyboard } from '../../hooks/useKeyboard';
import themeContext from '../../themes/theme';

const AuthInput = ({
  setTextInput,
  placeholder,
  setEmailDone,
}) => {
  const [opacity] = useState(new Animated.Value(0));
  const [onFocus, setOnFocus] = useState(false);
  const color = useContext(themeContext);
  const input = useRef();
  const keyboardHeight = useKeyboard();
  const keyboardVisible = keyboardHeight > 0 ? true : false;
  const placeholderInput = placeholder ? placeholder : 'Type Here';
  const handleOnFocus = () => {
    setOnFocus(true);
  };
  const handleOnSubmitEdit = () => {
    setEmailDone(true);
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
        onChangeText={setTextInput}
        placeholder={placeholderInput}
        placeholderTextColor={color.placeholder}
        autoFocus={Platform == 'ios' ? true : null}
        style={[styles.input, { color: color.text, fontSize: keyboardVisible ? 24 : 42 }]}
      />
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontWeight: 'bold',
    width: '70%',
    textAlign: 'center',
  },
  indicator: {
    fontSize: 42,
    fontWeight: 'bold',
  },
});