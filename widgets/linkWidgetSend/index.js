import { useContext } from 'react';
import { StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import themeContext from '../../themes/theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCardStore } from '../../state/useCardStore';


export default function LinkWidgetSend({ card }) {
  const color = useContext(themeContext);
  const navigation = useNavigation();

  const {
    cardProfileColor,
    cardProfileColorIsDark,
    cardProfileColorLight,
    cardProfileColorDark,
  } = useCardStore();

  const isDarkBlack = cardProfileColorIsDark ? 'black' : 'white';
  const isDarkWhite = cardProfileColorIsDark ? 'white' : 'black';
  const isDarkLight = cardProfileColorIsDark ? cardProfileColorLight : cardProfileColorDark;
  const isDarkDark = cardProfileColorIsDark ? cardProfileColorDark : cardProfileColorLight;
  
  const backgroundImageColor = isDarkLight;
  const backgroundOpacityColor = isDarkLight;
  const buttonColor = isDarkBlack;
  const buttonTextColor = isDarkWhite;
  const textColor = isDarkBlack;

  const navigateToCreateLink = () => navigation.navigate('CreateLink', { card });

  return (
    <TouchableOpacity
      onPress={navigateToCreateLink}
      style={[styles.main, { backgroundColor: buttonColor }]}
    >
      <View style={styles.header}>
        <Ionicons name='add-circle' size={24} color={buttonTextColor} />
        <Text style={{ color:buttonTextColor, marginStart: 10, fontWeight: 'bold', fontSize: 20 }}>Create new link</Text>
      </View>
    </TouchableOpacity>
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
    justifyContent: 'flex-start',
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
    flexDirection:'row'
  },
  statusIcon: { height: 16, width: 16, borderRadius: 8, backgroundColor: 'grey', marginEnd: 5 },
  button:{
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius:10,
  },
});