import { useContext } from 'react';
import { StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import themeContext from '../../themes/theme';
import { useNavigation } from '@react-navigation/native';
import { ENROLL_URL } from '../../K/urls';
import { useCardStore } from '../../state/useCardStore';

export default function LinkWidget({ isPublic, item }) {
  const color = useContext(themeContext);
  const navigation = useNavigation();

  const { cardProfileColor, cardProfileColorIsDark, cardProfileColorLight, cardProfileColorDark } =
    useCardStore();

  const isDarkBlack = cardProfileColorIsDark ? 'black' : 'white';
  const isDarkWhite = cardProfileColorIsDark ? 'white' : 'black';
  const isDarkLight = cardProfileColorIsDark ? cardProfileColorLight : cardProfileColorDark;
  const isDarkDark = cardProfileColorIsDark ? cardProfileColorDark : cardProfileColorLight;

  const backgroundColor = isDarkLight;
  const backgroundImageColor = isDarkLight;
  const backgroundOpacityColor = isDarkLight;
  const buttonColor = isDarkBlack;
  const buttonTextColor = isDarkWhite;
  const textColor = isDarkBlack;

  const cardId = item?.cardId;
  const id = item?.id;
  const name = item?.name ? item.name : isPublic ? 'Public URL' : '';
  const unit = item?.unit ? item.unit : isPublic ? '' : '';
  const used = item?.used ? item.used : false;
  const value = item?.value ? item.value : isPublic ? 'SHARE' : '';
  const expired = item?.expired ? item.expired : false;
  const expiry = item?.expiry ? item.expiry : '';
  const generatedLink = `${ENROLL_URL}${cardId}/${id}`;

  const navigateToQR = () =>
    navigation.navigate('QRcode', {
      value,
      expired,
      expiry,
      name,
      id,
      cardId,
      unit,
      used,
      generatedLink,
    });

  return (
    <View style={[styles.main, { backgroundColor: backgroundColor }]}>
      <View style={styles.header}>
        <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 20 }}>
          {value} {unit}
        </Text>
        {used ? null : (
          <Switch value={true} style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }} />
        )}
      </View>
      <Text style={{ color: textColor }}>{name}</Text>
      <View style={styles.footer}>
        <View style={styles.status}>
          <View style={[styles.statusIcon, { backgroundColor: used ? color.action : 'lightgreen' }]} />
          <Text style={{ color: textColor }}>{used ? 'Used' : ''}</Text>
        </View>

        <TouchableOpacity
          onPress={navigateToQR}
          style={[styles.button, { backgroundColor: buttonColor }]}
        >
          <Ionicons name='share-social-sharp' size={20} color={buttonTextColor} />
          <Text style={{ fontWeight: 'bold', color: buttonTextColor }}>Send Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer:{
    width:'100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingEnd: 10,
  },
  status: {
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  statusIcon: { height: 12, width: 12, borderRadius: 8, backgroundColor: 'grey', marginEnd: 5 },
  button:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius:10,
  },
});