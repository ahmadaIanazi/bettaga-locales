import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native';
import AuthEmail from '../../widgets/AuthEmail';
import AuthHeader from '../../widgets/AuthHeader';
import AuthHero from '../../widgets/AuthHero';
import AuthPassword from '../../widgets/AuthPassword';
import BottomButton from '../../widgets/BottomButton';
import registerAnonymous from '../../data/auth/registerAnonymous';
import { signUser } from '../../data/auth/signinUser';
import { signupAnonymous } from '../../data/auth/signupAnonymous';
import { signupUser } from '../../data/auth/signupUser';
import { useEmailValidation } from '../../yup/useEmailValidation';
import { useKeyboard } from '../../hooks/useKeyboard';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';
import { useRefreshUserStore } from '../../state/useRefreshUserStore';
import { useUserStore } from '../../state/useUserStore';

export default function ScreenAuth({ route = {} }) {
  const { params = {} } = route;
  const { fromModal = false } = params;
  const getUserDoc = useUserStore((state) => state.getUserDoc);
  const isAnonymous = useUserStore((state) => state.isAnonymous);
  const getIsAnonymous = useUserStore((state) => state.getIsAnonymous);
  const setRefreshUser = useRefreshUserStore((state) => state.setRefreshUser);
  const [email, setEmail] = useState('');
  const { errorValidate, isValid } = useEmailValidation(email);
  const navigation = useNavigation();
  const color = useContext(themeContext);
  const [sign, setSign] = useState(true);
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [emailDone, setEmailDone] = useState(false);
  const [error, setError] = useState('Sign up now!');
  const [loading, setLoading] = useState(false);
  const keyboardHeight = useKeyboard();
  const buttonColor = color.action;
  const keyboardVisible = keyboardHeight > 0 ? true : false;

  const handleEmailDone = () => {
    setError(errorValidate);
    if (isValid) {
      setEmailDone(true);
    }
  };

  const handleDone = () => {
    if (emailDone) {
      if (sign) {
        if (isAnonymous) {
          setLoading(true);
          signupAnonymous(email, password)
            .then(() => {
              navigation.push('IntroNavigation');
              navigation.popToTop();
              setRefreshUser(true);
              getIsAnonymous(false);
            })
            .catch((error) => {
              setLoading(false);
              setPassword('');
              switch (error.code) {
                case 'auth/email-already-in-use':
                  setError('The email is already in use.');
                  break;
                case 'auth/invalid-email':
                  setError('Invalid email address.');
                  break;
                case 'auth/weak-password':
                  setError('The password is too weak.');
                  break;
                default:
                  setError('Email Taken or an error occurred.');
              }
            });
        } else {
          setLoading(true);
          signupUser(email, password, getUserDoc)
            .then(() => {
              navigation.push('IntroNavigation');
              navigation.popToTop();
              setRefreshUser(true);
              getIsAnonymous(false);
            })
            .catch((error) => {
              setLoading(false);
              setPassword('');
              switch (error.code) {
                case 'auth/email-already-in-use':
                  setError('The email is already in use.');
                  break;
                case 'auth/invalid-email':
                  setError('Invalid email address.');
                  break;
                case 'auth/weak-password':
                  setError('The password is too weak.');
                  break;
                default:
                  setError('Wrong Email or Password.');
              }
            });
        }
      }
      if (login) {
        if (isAnonymous) {
          setLoading(true);
          signupAnonymous(email, password)
            .then((user) => {
              navigation.push('IntroNavigation');
              navigation.popToTop();
              setRefreshUser(true);
              getIsAnonymous(false);
            })
            .catch((error) => {
              setLoading(false);
              setPassword('');
              switch (error.code) {
                case 'auth/email-already-in-use':
                  setError('The email is already in use.');
                  break;
                case 'auth/invalid-email':
                  setError('Invalid email address.');
                  break;
                case 'auth/weak-password':
                  setError('The password is too weak.');
                  break;
                default:
                  setError('Wrong Email or Password.');
              }
            });
        } else {
          setLoading(true);
          signUser(email, password, getUserDoc)
            .then(() => {
              navigation.push('IntroNavigation');
              navigation.popToTop();
              setRefreshUser(true);
              getIsAnonymous(false);
            })
            .catch((error) => {
              setLoading(false);
              setPassword('');
              switch (error.code) {
                case 'auth/email-already-in-use':
                  setError('The email is already in use.');
                  break;
                case 'auth/invalid-email':
                  setError('Invalid email address.');
                  break;
                case 'auth/weak-password':
                  setError('The password is too weak.');
                  break;
                default:
                  setError('Wrong user or pass, or an error occurred.');
              }
            });
        }
      }
    }
  };
  const handleLogin = () => {
    setLogin(true);
    setSign(false);
    setError('Type your email to login');
  };
  const handleSignup = () => {
    setSign(true);
    setLogin(false);
    setError('Type your email to sign up');
  };
  const handleDiscover = () => {
    registerAnonymous(isAnonymous)
      .then(() => {
        console.log('Anonymous user created & signed in!');
        navigation.navigate('IntroNavigation');
      })
      .catch((err) => {
        navigation.goBack();
        console.log(err.message, err.code);
        setError(err);
        console.log('Anonymous user creation & sign-in failed!');
      });
  };

  const handleTerms = () => {
    WebBrowser.openBrowserAsync('https://sites.google.com/view/bananaapp/terms-of-service');
  };
  const handlePolicy = () => {
    WebBrowser.openBrowserAsync('https://sites.google.com/view/bananaapp/privacy-policy');
  };

  return (
    <View style={{ backgroundColor: color.background, height: '100%' }}>
      <View style={styles.header}>
        {!emailDone ? (
          <AuthHeader
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            handleDisover={handleDiscover}
            login={login}
            sign={sign}
            fromModal={fromModal}
          />
        ) : (
          <TouchableHighlight onPress={(e) => setEmailDone(!e)}>
            <Text> Back </Text>
          </TouchableHighlight>
        )}
      </View>
      <View
        style={[
          styles.hero,
          {
            height: keyboardVisible ? 120 : 180,
            width: keyboardVisible ? 120 : 180,
          },
        ]}
      >
        {!emailDone ? <AuthHero img={'email'} /> : <AuthHero img={'password'} />}
      </View>
      <View style={styles.input}>
        {!emailDone ? (
          <AuthEmail
            type={'email'}
            email={email}
            setEmail={setEmail}
            placeholder={'Your Email?'}
            setEmailDone={setEmailDone}
            handleEmailDone={handleEmailDone}
          />
        ) : (
          <AuthPassword
            type={'password'}
            password={password}
            setPassword={setPassword}
            placeholder={'Your Password?'}
            handleDone={handleDone}
          />
        )}
      </View>
      <View style={styles.error}>
        <Text style={{ color: color.text }}> {error + ` ` + errorValidate} </Text>
      </View>
      <View style={styles.terms}>
        <Text style={{ color: color.text }}>By signing up you agree to our </Text>
        <TouchableOpacity onPress={handleTerms}>
          <Text style={[txt.h6, { color: color.text }]}>Terms</Text>
        </TouchableOpacity>
        <Text style={{ color: color.text }}> and </Text>
        <TouchableOpacity onPress={handlePolicy}>
          <Text style={[txt.h6, { color: color.text }]}>Policy</Text>
        </TouchableOpacity>
      </View>
      <BottomButton
        buttonColor={buttonColor}
        loading={loading}
        handleOnPress={emailDone ? handleDone : handleEmailDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 60,
    marginStart: 14,
    marginBottom: 40,
  },
  hero: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  input: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  error: {
    alignSelf: 'center',
  },
  terms: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonTouch: {
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
  },
});
