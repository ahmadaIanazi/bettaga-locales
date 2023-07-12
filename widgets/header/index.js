import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import txts from '../../themes/texts';

import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import themeContext from '../../themes/theme';
import LOCALIZATION from '../../locales';

export default function Header({ navigator, title, subtitle, buttonName, buttonIcon, back, to, data, color }) {
  const l = useContext(LOCALIZATION)
  const navigation = useNavigation();
  const themeColor = useContext(themeContext)

  const handleButtonPress = () => {
    if (to == 'CardSettingsNavigation') {
      navigation.navigate('CardSettingsNavigation', { card: data });
    }
    if (to == 'goBack') {
      navigation.goBack();
    }
    if (to == 'popup') {
      navigation.goBack();
    }
    if (to == 'settings') {
      navigation.navigate('ModalSettings');
    }
  };

  return (
    <View style={[styles.main, { direction: l.direction }]}>
      <View style={styles.backContainer}>
        {back ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{ marginEnd: 15 }}
              name='arrow-back'
              size={36}
              color={color ? color : themeColor.text}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        <View style={styles.textContainer}>
          {title != undefined && (
            <Text
              style={[
                navigator ? txts.navigator : txts.title,
                { color: color ? color : themeColor.text },
              ]}
            >
              {title}
            </Text>
          )}
          {subtitle != undefined && (
            <Text style={[txts.subtitle, { color: color ? color : themeColor.text }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={handleButtonPress} style={styles.buttonContainer}>
        <Text style={{ color: color ? color : themeColor.text }}>{buttonName}</Text>
        <Ionicons
          style={{ marginStart: 15 }}
          name={buttonIcon}
          size={24}
          color={color ? color : themeColor.text}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
