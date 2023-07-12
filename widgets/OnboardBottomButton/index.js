import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View, Dimensions } from 'react-native';
import { useKeyboard } from '../../hooks/useKeyboard';
import txt from '../../themes/txt';

const { height, width } = Dimensions.get('window');

const OnboardBottomButton = ({ loading, handleOnPress, lastSlide, buttonColor }) => {
  const keyboardHeight = useKeyboard();
  const [buttonText, setButtonText] = useState('Next');

  useEffect(() => {
    console.log('LAST SLIDE:', lastSlide);
    if (lastSlide) {
      setButtonText('Get Started');
    } else {
      setButtonText('Next');
    }
  }, [lastSlide, loading]);

  return loading ? (
    <View
      style={[
        styles.button,
        {
          bottom: keyboardHeight ? keyboardHeight : 0,
          backgroundColor: buttonColor,
        },
      ]}
    >
      <ActivityIndicator size='large' color='white' />
    </View>
  ) : (
    <TouchableHighlight
      underlayColor={'black'}
      onPress={handleOnPress}
      style={[
        styles.button,
        {
          bottom: keyboardHeight ? keyboardHeight : 0,
          backgroundColor: buttonColor,
        },
      ]}
    >
      <Text style={txt.h2}>{buttonText}</Text>
    </TouchableHighlight>
  );
};

export default OnboardBottomButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: width,
    height: height * 0.1244,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
