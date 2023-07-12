import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { signout } from '../../data/auth/signout';
import { clearLocalStorage, useUserStore } from '../../state/useUserStore';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';

const SettingsItemsAccount = () => {
  /** ROLE LOGIC HERE */
  const role = useUserStore((state) => state.user.role);
  const isAnonymous = useUserStore((state) => state.user.isAnonymous);

  const SHOW = isAnonymous ? true : role == 'merchant';

  const navigation = useNavigation();

  const color = useContext(themeContext);

  const accountItems = [
    { id: 2, action: 'deactivate', title: 'Deactivate', detail: '', icon: 'highlight-remove' },
    { id: 3, action: 'logout', title: 'Logout', detail: '', icon: 'logout' },
  ];

  const handleAccountItems = (action) => {
    if (action == 'deactivate') {
      //TODO: deactivate
    }
    if (action == 'logout') {
      signout().then(() => {
        clearLocalStorage();
        navigation.goBack();
      });
    }
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={[txt.h3, { marginStart: 10, color: color.placeholder }]}>Account</Text>
      </View>
      {accountItems.map((item, index) => {
        if (item.action === 'deactivate' && !SHOW) {
          return null; // Skip rendering the item if the role is not 'merchant'
        }
        return (
          <TouchableOpacity
            onPress={() => handleAccountItems(item.action)}
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

export default SettingsItemsAccount;

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
