import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../utils/formatDate';
import { hexOrRgbToLightest } from '../../utils/hexOrRgbToLightest';
import { getOnlyNumber } from '../../utils/getOnlyNumber';
import { capitalizeLetters } from '../../utils/capitalizeLetters';
import themeContext from '../../themes/theme';

export default function Customer({ customer }) {
  const navigation = useNavigation();
  const color = useContext(themeContext)

  /** UI */
  const customerName = customer?.name;
  const country = customer?.country;
  const value = customer?.value;
  const lastUpdate = formatDate(customer?.lastUpdated);
  const avatar = customer?.passJson?.backgroundColor;
  const backgroundColor = hexOrRgbToLightest(customer?.passJson?.backgroundColor);

  /** CALCULATE TOTALS */
  const getTotalMaxValueCount = getOnlyNumber(customer?.maxValue);
  const UNIT = capitalizeLetters(customer?.unit);
  const TOTALVALUE = `${value} ${UNIT}`;

  const navigateToPass = () => {
    const passes = [customer];
    navigation.navigate('ModalScanned', { passes: passes });
  };

  return (
    <TouchableOpacity
      onPress={navigateToPass}
      style={[styles.main, { backgroundColor: color.light }]}
    >
      <View style={{ flexDirection: 'row' }}>
        <View>
          <View style={[styles.avatar, { backgroundColor: avatar }]} />
        </View>
        <View style={{ flexDirection: 'row', flex:1, justifyContent:'space-between'}}>
          <Text style={[styles.name, { color: color.text }]}>{customerName}</Text>
          <Text style={[styles.value,{ color: color.text }]}>{TOTALVALUE}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={{color: color.placeholder }}>{country}</Text>
        <Text style={{ color: color.placeholder }}>{lastUpdate}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 100,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
  },
  avatar: {
    borderWidth: 2,
    height: 40,
    width: 40,
    borderRadius: 20,
    marginEnd: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,

  },
  footer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
});
