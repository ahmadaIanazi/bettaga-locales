import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';
import * as WebBrowser from 'expo-web-browser';

const SettingsItemsAbout = () => {
  const color = useContext(themeContext);
  const AboutItems = [
    { id: 1, action: 'privacy', title: 'Privacy Policy', detail: '', icon: 'privacy-tip' },
    { id: 2, action: 'terms', title: 'Terms of use', detail: '', icon: 'policy' },
    { id: 3, action: 'rules', title: 'Rules and Guidelines', detail: '', icon: 'rule' },
    { id: 4, action: 'support', title: 'Customers Support', detail: '', icon: 'support' },
  ];

  const handleOpenLink = (action) => {
    if (action == 'privacy') {
      WebBrowser.openBrowserAsync('https://sites.google.com/view/bananaapp/privacy-policy');
    }
    if (action == 'terms') {
      WebBrowser.openBrowserAsync('https://sites.google.com/view/bananaapp/terms-of-service');
    }
    if (action == 'rules') {
      WebBrowser.openBrowserAsync(
        'https://sites.google.com/view/bananaapp/rules-and-policies'
      );
    }
    if (action == 'support') {
      WebBrowser.openBrowserAsync('https://sites.google.com/view/bananaapp/support');
    }
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={[txt.h3, { marginStart: 10, color: color.placeholder }]}>About</Text>
      </View>
      {AboutItems.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => handleOpenLink(item.action)}
            key={index}
            style={styles.rowView}
          >
            <View style={styles.centerRow}>
              <MaterialIcons name={item.icon} size={24} color={color.text} />
              <Text style={[txt.h4, { color: color.text, marginStart: 10 }]}>{item.title}</Text>
            </View>
            <View style={styles.centerRow}>
              <Text style={[txt.h6, { color: color.text }]}>{item.detail}</Text>
              <MaterialIcons name='keyboard-arrow-right' size={24} color={color.text} />
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default SettingsItemsAbout;

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginStart: 8,
    marginTop: 20,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  centerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
