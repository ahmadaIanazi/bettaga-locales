import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';

const AuthHeader = ({ handleLogin, handleSignup, handleDisover, login, sign, fromModal }) => {
  const color = useContext(themeContext);


  if (login || !sign) {
    return (
      <View style={styles.main}>
        <Text style={[txt.h3l, { color: color.text}]}>New here? </Text>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={[txt.h3, {color: color.text}]}>Signup </Text>
        </TouchableOpacity>
        {fromModal ? null : (
          <>
        <Text style={[txt.h3l, {color: color.text}]}>or </Text>
          <TouchableOpacity onPress={handleDisover}>
            <Text style={[txt.h3, {color: color.text}]}>Discover</Text>
          </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
  if (sign || !login) {
    return (
      <View style={styles.main}>
        <Text style={[txt.h3l, {color: color.text}]}>Returning? </Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={[txt.h3, {color: color.text}]}>Login </Text>
        </TouchableOpacity>
        {fromModal ? null : (
          <>
        <Text style={[txt.h3l, {color: color.text}]}>or </Text>
          <TouchableOpacity onPress={handleDisover}>
            <Text style={[txt.h3, {color: color.text}]}>Discover</Text>
          </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
  // if (modal) {
  //   return (
  //     <View style={styles.main}>
  //       <Text style={txt.h3l}>Returning? </Text>
  //       <TouchableOpacity onPress={handleLogin}>
  //         <Text style={txt.h3}>Login </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  // if (modal) {
  //   return (
  //     <View style={styles.main}>
  //       <Text style={txt.h3l}>New here? </Text>
  //       <TouchableOpacity onPress={handleSignup}>
  //         <Text style={txt.h3}>Signup </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
};

export default AuthHeader;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
