import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native';
import { useKeyboard } from '../../hooks/useKeyboard';
import txt from '../../themes/txt';

const { height, width } = Dimensions.get('screen');

const BottomButton = ({
  state,
  loading,
  isPhoneNumber,
  handleOnPress,
  codeValid,
  codeFocus,
  buttonColor,
}) => {
  const keyboardHeight = useKeyboard();
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    // if (state == 'none') {
    //   setButtonText('Next');
    // }
    // if (state == 'phoneError') {
    //   setButtonText('Again');
    // }
    // if (state == 'codeError') {
    //   setButtonText('Again');
    // }
    // if (state == 'recaptchaError') {
    //   setButtonText('Hmmm..');
    // }
    // if (state == 'phoneValidated') {
    //   setButtonText('Verify');
    // }
    // if (state == 'codeValidated') {
    //   setButtonText('');
    // }
    if(codeValid){
      setButtonText('Verify')
    }
    else if(codeFocus){
      setButtonText('SMS Code ..');
    }
    else if (isPhoneNumber) {
      setButtonText('Send Code');
    } else {
      setButtonText('Next');
    }
  }, [state, isPhoneNumber, codeValid, codeFocus]);

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
      <Text style={[txt.h2, { color: isPhoneNumber ? 'black' : 'white' }]}>{buttonText}</Text>
    </TouchableHighlight>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: width,
    height: height * 0.124,
    borderTopRightRadius: width * 0.0512,
    borderTopLeftRadius: width * 0.0512,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
