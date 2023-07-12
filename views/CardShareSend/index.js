import { useContext, useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Links from '../../components/links';
import { getPrivatesByCardId } from '../../data/get/getPrivatesByCardId';
import { useCardStore } from '../../state/useCardStore';
import { useUserStore } from '../../state/useUserStore';
import themeContext from '../../themes/theme';
import Header from '../../widgets/header';
import LivepreviewButtons from '../../widgets/livepreviewButtons';
import PhoneForm from '../../widgets/phoneForm';
import { Ionicons } from '@expo/vector-icons';
import { hexOrRgbToRgba } from '../../utils/hexOrRgbToRgba';
import { useNavigation } from '@react-navigation/native';


export default function ScreenCardPageSend({
  route: {
    params: { card },
  },
}) {
  const {
    cardState,
    cardProfileColor,
    cardProfileColorIsDark,
    cardProfileColorLight,
    cardProfileColorDark,
  } = useCardStore();

  /** ROLE LOGIC HERE */
  const role = useUserStore((state) => state.user.role);
  const isAnonymous = useUserStore((state) => state.user.isAnonymous);

  const SHOW = isAnonymous ? true : role == 'merchant';

  const [showall, setShowall] = useState(false);
  const color = useContext(themeContext);
  const [links, setlinks] = useState([]);

  useEffect(() => {
    const cardId = card?.id;
    getPrivatesByCardId(cardId).then((privates) => {
      setlinks(privates);
    });
  }, [card]);
  const navigation = useNavigation()

  const isDarkBlack = cardProfileColorIsDark ? 'black' : 'white';
  const isDarkWhite = cardProfileColorIsDark ? 'white' : 'black';
  const isDarkLight = cardProfileColorIsDark ? cardProfileColorLight : cardProfileColorDark;
  const isDarkDark = cardProfileColorIsDark ? cardProfileColorDark : cardProfileColorLight;

  const backgroundColor = isDarkBlack;
  const backgroundImageColor = isDarkLight;
  const backgroundOpacityColor = isDarkLight;
  const buttonColor = isDarkBlack;
  const buttonTextColor = isDarkWhite;
  const textColor = isDarkWhite;
  const opacityColor = hexOrRgbToRgba(buttonColor, 0.4);


  /** UI LABELS  */
  const CARD_NAME = card?.cardName;
  const Enroll_title_label = 'Send Card Page';
  const Links_Title_label = 'Links';
  const See_All_label = showall ? 'back' : 'See all';


  const navigateToEnrollEdit = () => {
    navigation.navigate('EnrollSettings', { card });
  };
  

  return (
    <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          backgroundColor: backgroundOpacityColor,
          opacity: 0.6,
          ...StyleSheet.absoluteFill,
        }}
      />
      <SafeAreaView>
        <Header
          navigator={true}
          back={true}
          title={'Send Card To Customers'}
          subtitle={CARD_NAME}
          color={textColor}
        />
        {!showall && (
          <View style={{ marginHorizontal: 20 }}>
            <PhoneForm card={card} />
            <View style={styles.dropshadow} />
            <Text
              style={{
                marginTop: -20,
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                color: textColor,
              }}
            >
              {Enroll_title_label}
            </Text>
            {SHOW && (
              <TouchableOpacity onPress={navigateToEnrollEdit} style={styles.buttonsContainer}>
                <View style={[styles.button, { backgroundColor: buttonColor }]}>
                  <Ionicons name='create-outline' size={24} color={textColor} />
                  <Text style={{ color: textColor }}>Edit</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              flexDirection: 'row',
            }}
          >
            <Text style={{ color: textColor, fontSize: 24, fontWeight: 'bold' }}>
              {Links_Title_label}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setShowall(!showall);
              }}
            >
              <Text style={{ fontSize: 14, color: textColor, opacity: 0.5 }}>{See_All_label}</Text>
            </TouchableOpacity>
          </View>
          <Links card={card} links={links} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 40,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  dropshadow: {
    width: 150,
    height: 50,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,

    backgroundColor: 'black',
    alignSelf: 'center',
    top: -51,
    zIndex: -1,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
  },
});
