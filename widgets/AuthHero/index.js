import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { useKeyboard } from '../../hooks/useKeyboard';

const { height, width } = Dimensions.get('screen')
const AuthHero = ({ img }) => {
  const keyboardHeight = useKeyboard();
  const keyboardVisible = keyboardHeight > 0 ? true : false;
    const image =
        img == 'email'
        ? require('../../../assets/img/hero-phone.png')
        : img == 'emailError'
        ? require('../../../assets/img/hero-phone-error.png')
        : img == 'password'
        ? require('../../../assets/img/hero-password.png')
        : img == 'passwordError'
        ? require('../../../assets/img/hero-password-error.png')
        : img == 'drop'
        ? require('../../../assets/img/hero-banana-drop.png')
        : img == 'pick'
        ? require('../../../assets/img/hero-banana-pick.png')
        : img == 'location'
        ? require('../../../assets/img/hero-location.png')
        : img == 'notification'
        ? require('../../../assets/img/hero-notification.png')
        : require('../../../assets/img/loading.png');
    

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={[
          styles.hero,
          {
            height: keyboardVisible ? height * 0.142 : height * 0.213,
            width: keyboardVisible ? height * 0.142 : height * 0.213,
          },
        ]}
        source={image}
      />
    </View>
  );
};

export default AuthHero;

const styles = StyleSheet.create({
  hero: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
