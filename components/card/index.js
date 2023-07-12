import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Tap } from '../../../customized';
import { toNameFromTemplateId } from '../../operations/to';
import { colorIsDark } from '../../utils/colorIsDark';
import { formatDate } from '../../utils/formatDate';
import { useCardStore } from '../../state/useCardStore';
import { useContext } from 'react';
import themeContext from '../../themes/theme';

export default function Card({ item, disable }) {
  const color = useContext(themeContext)
  const theme = color.theme

  const { setCardState } = useCardStore()
  const navigation = useNavigation();
  const cardLogo = item?.logo;
  const navigateToCardProfile = () => {
    setCardState(item);
    navigation.navigate('CardProfileNavigation', { card: item });
  };
  const cardName = item?.cardName;
  const cardColor = item?.cardColor;
  const backgroundColor = item?.passJson?.backgroundColor;
  const textColor = item?.passJson?.foregroundColor;
  const labelColor = item?.passJson?.labelColor;
  const cardTemplate = toNameFromTemplateId(item?.templateId);
  const isDark = colorIsDark(item?.cardColor);
  const getColor = isDark ? 'white' : 'black';
  const isThemeAndCardDark = isDark && theme === 'dark'
  const stat_one_label = 'CUSTOMERS';
  const stat_one_value = item?.customersCount;
  const stat_two_label = 'TRANSACTIONS';
  const stat_two_value = item?.transactionCount;
  const expiry_label = 'EXPIRY';
  const expiry_value = formatDate(item?.expiryDate);
  const active_status = item?.active ? 'active' : 'disabled';
  const isTrial = item?.trial ? true : false;

  const TrialStrip = () => {
    return (
      <View style={styles.stripContainer}>
        <View style={[styles.strip, { backgroundColor: getColor }]} />
        <Text style={[styles.stripText, { color: backgroundColor }]}>TRIAL</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        // marginHorizontal: 15,
        marginVertical: 15,
        width: 270,
      }}
    >
      <Tap
        disabled={disable}
        onPress={navigateToCardProfile}
        s={isThemeAndCardDark ? 'br-20 h-160 sh1 bw-1' : 'br-20 h-160 sh1'}
        borderColor={'white'}
        color={cardColor}
      >
        <View style={styles.containerBox}>
          <View style={styles.header}>
            <View
              style={{
                flexDirection: 'row',
                // flex: 1,
                // justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <View style={styles.logo}>
                <Image
                  onLoad={() => <ActivityIndicator size='small' color={getColor} />}
                  onError={() => <ActivityIndicator size='small' color={getColor} />}
                  style={styles.image}
                  source={{ uri: cardLogo }}
                />
              </View>
              <Text style={[styles.brandText, { color: labelColor }]}>{cardName}</Text>
            </View>
            {isTrial && <TrialStrip />}
          </View>
          <View style={styles.rowType}>
            <Text style={{ color: labelColor }}>{cardTemplate}</Text>
            <Ionicons name='ios-gift' size={24} color={labelColor} />
          </View>
          <View style={styles.row}>
            <Text style={[styles.stat, { color: labelColor }]}>{stat_one_label}</Text>
            <Text style={[styles.statvalue, { color: textColor }]}>{stat_one_value}</Text>
            <Text style={[styles.stat, { color: labelColor }]}>{stat_two_label}</Text>
            <Text style={[styles.statvalue, { color: textColor }]}>{stat_two_value}</Text>
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.expiry, { color: labelColor }]}>{expiry_label}</Text>
              <Text style={[styles.value, { color: getColor }]}>{expiry_value}</Text>
            </View>
            <Text style={[styles.id, { color: getColor }]}>{active_status}</Text>
          </View>
        </View>
      </Tap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    height: 160,
    borderRadius: 20,
  },
  containerBox:{
    flex:1,
    padding: 10,
    justifyContent: 'space-between',
    overflow:'hidden',
  },
  stripContainer: {

    top:0,
    right:0,
    position: 'absolute',
    width: 50,
    height: 50,
  },
  strip: {
    position: 'absolute',
    top: 5,
    right: -35,
    backgroundColor: 'red', // Change the color as needed
    width: 100,
    height: 20,
    transform: [{ rotate: '45deg' }],
  },
  stripText: {
    position: 'absolute',
    top: 5,
    right: -5,
    textAlign:'center',
    color: 'white', // Change the color as needed
    transform: [{ rotate: '45deg' }],
    fontWeight:'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginEnd: 5,
  },
  image: {
    resizeMode: 'contain',
    height: 40,
    // width: 40,
  },
  brandText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stat: {
    fontSize: 10,
  },
  statvalue: { fontSize: 12, fontWeight: 'bold' },
  expiry: { fontSize: 10, marginEnd: 4 },
  value: { fontSize: 12, fontWeight: 'bold' },
  id: { fontSize: 10 },
});