import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../state/useUserStore';
import Subscriptions from '../Subscriptions';

const SettingsItemsSettings = () => {
  /** ROLE LOGIC HERE */
  const role = useUserStore((state) => state.user.role);
  const isAnonymous = useUserStore((state) => state.user.isAnonymous);

  const SHOW = isAnonymous ? true : role == 'merchant';

  const color = useContext(themeContext);
  const navigation = useNavigation();

  const settingsEdits = [
    { id: 6, action: 'subusers', title: 'Sub Users', detail: '', icon: 'people' },
    { id: 7, action: 'password', title: 'Change Password', detail: '', icon: 'lock' },
    { id: 8, action: 'email', title: 'Change Email', detail: '', icon: 'email' },
  ];

  const settingsItems = [
    { id: 4, action: 'subscriptions', title: 'Subscriptions', detail: '', icon: 'payments' },
    { id: 5, action: 'payments', title: 'Payments', detail: '', icon: 'history' },
  ];

  const settingsItemsTwo = [
    { id: 1, action: 'appearance', title: 'Appearance', detail: '', icon: 'wb-twighlight' },
    { id: 2, action: 'language', title: 'Language', detail: '', icon: 'text-fields' },
    { id: 3, action: 'update', title: 'Update', detail: '', icon: 'system-update' },
  ];

  const handleSettings = (action, title) => {
    navigation.navigate('ModalSettingsItem', { action, title });
  };

  return (
    <>
      <View style={{ margin: 10 }} />
      {settingsEdits.map((item, index) => {
        if (!SHOW) {
          return null; // Skip rendering the item if the role is not 'merchant'
        }
        return (
          <TouchableOpacity
            onPress={() => handleSettings(item.action, item.title)}
            key={index}
            style={styles.rowView}
          >
            <View style={styles.centerRow}>
              <MaterialIcons name={item.icon} size={24} color={color.text} />
              <Text style={[txt.h4, { color: color.text, marginStart: 10 }]}>{item.title}</Text>
            </View>
            <View style={styles.centerRow}>
              <Text style={txt.h6}>{item.detail}</Text>
              <MaterialIcons name='keyboard-arrow-right' size={24} color={color.text} />
            </View>
          </TouchableOpacity>
        );
      })}
      <View style={{ margin: 10 }} />
      {settingsItems.map((item, index) => {
        if (!SHOW) {
          return null; // Skip rendering the item if the role is not 'merchant'
        }
        return (
          <TouchableOpacity
            onPress={() => handleSettings(item.action, item.title)}
            key={index}
            style={styles.rowView}
          >
            <View style={styles.centerRow}>
              <MaterialIcons name={item.icon} size={24} color={color.text} />
              <Text style={[txt.h4, { color: color.text, marginStart: 10 }]}>{item.title}</Text>
            </View>
            <View style={styles.centerRow}>
              <Text style={txt.h6}>{item.detail}</Text>
              <MaterialIcons name='keyboard-arrow-right' size={24} color={color.text} />
            </View>
          </TouchableOpacity>
        );
      })}
      <View style={{ margin: 10 }} />
      {settingsItemsTwo.map((item, index) => {
        if (item.action === 'subusers' && !SHOW) {
          return null; // Skip rendering the item if the role is not 'merchant'
        }

        return (
          <TouchableOpacity
            onPress={() => handleSettings(item.action, item.title)}
            key={index}
            style={styles.rowView}
          >
            <View style={styles.centerRow}>
              <MaterialIcons name={item.icon} size={24} color={color.text} />
              <Text style={[txt.h4, { color: color.text, marginStart: 10 }]}>{item.title}</Text>
            </View>
            <View style={styles.centerRow}>
              <Text style={txt.h6}>{item.detail}</Text>
              <MaterialIcons name='keyboard-arrow-right' size={24} color={color.text} />
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default SettingsItemsSettings;

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginStart: 5,
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
