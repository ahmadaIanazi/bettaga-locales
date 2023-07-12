import React, { useContext, useRef, useState } from 'react';
import {
  Animated, Keyboard,
  Platform, StyleSheet, TextInput, View
} from 'react-native';
import { useKeyboard } from '../../hooks/useKeyboard';
import themeContext from '../../themes/theme';

const AuthPassword = ({ setPassword, placeholder, password, handleDone }) => {
  const [opacity] = useState(new Animated.Value(0));
  const [onFocus, setOnFocus] = useState(false);
  const input = useRef();
  const color = useContext(themeContext);
  const keyboardHeight = useKeyboard();
  const keyboardVisible = keyboardHeight > 0 ? true : false;
  const placeholderInput = placeholder ? placeholder : 'Type Here';
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
        onFocus={handleOnFocus}
        autoFocus={Platform == 'ios' ? true : null}
        onChangeText={setPassword}
        returnKeyType='done'
        onSubmitEditing={handleDone}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        onBlur={Keyboard.disable}
        placeholder={placeholderInput}
        placeholderTextColor={color.placeholder}
        style={[styles.input, { color: color.text, fontSize: keyboardVisible ? 24 : 42 }]}
      />
    </View>
  );
};

export default AuthPassword;

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