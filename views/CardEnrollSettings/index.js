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
import LOCALIZATION from '../../locales';
import { Box, Div, Input, T, Tap } from '../../../customized';

export default function ScreenCardEnrollSettings({
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
  const l = useContext(LOCALIZATION)


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

  /** UI LABELS   */
  const placeholderName_label = 'Name Placeholder:';
  const placeholderPhone_label = 'Phone Placeholder'
  const submit_button_label = 'Submit';
  const submitTextColor_label = 'Submit Text Color'
  const submitText_label = 'Submit Text'
  const textColor_label = 'Text Color'
  const thankyou_label = 'Thank you message'
  const welcome_label = 'Welcome Message'
  const paragraph_label = 'Paragraph to show on the card'
  const creating_card_label = 'Creating card waiting message'
  const add_to_wallet_label = 'Add to wallet message'


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

  /** UI LABELS  */
  const CARD_NAME = card?.cardName;
  const Enroll_title_label = 'Send Card Page';
  const Links_Title_label = 'Links';
  const See_All_label = showall ? 'back' : 'See all';

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
          title={'Edit Enroll Form'}
          subtitle={CARD_NAME}
          color={textColor}
        />
        <View style={{ marginHorizontal: 20 }}>
          <PhoneForm card={card} />
          <View style={styles.dropshadow} />
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
