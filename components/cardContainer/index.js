import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import LOCALIZATION from '../../locales';
import { getPassImageByTemplateId } from '../../operations/get';
import { useCardStore } from '../../state/useCardStore';
import { useUserStore } from '../../state/useUserStore';
import { capitalizeLetters } from '../../utils/capitalizeLetters';
import { getTotalPropertyValue } from '../../utils/getTotalPropertyValue';
import themeContext from '../../themes/theme'

const { width, height } = Dimensions.get('screen');

export default function CardContainer({ card }) {
  const l = useContext(LOCALIZATION);
  const color = useContext(themeContext)

  const navigation = useNavigation();
  const {
    cardState,
    cardProfileColor,
    cardProfileColorIsDark,
    cardProfileColorLight,
    cardProfileColorDark,
  } = useCardStore();

  const customers = useUserStore((state) => state.customers);

  /** ROLE LOGIC HERE */
  const role = useUserStore((state) => state.user.role);
  const isAnonymous = useUserStore((state) => state.user.isAnonymous);

  const SHOW = isAnonymous ? true : role == 'merchant';

  /** CARD STATUS */
  const isPaid = cardState.paid;
  const isTrial = cardState.trial;
  const isExpired = cardState.expired;

  const expiryDate = cardState.expiryDate;

  const cardId = card?.id;
  const cardLogo = card?.logo;
  const getTextColor = cardProfileColorIsDark ? 'white' : 'black';
  const getShadeColor = cardProfileColorIsDark ? cardProfileColorLight : cardProfileColorDark;

  const isDarkBlack = cardProfileColorIsDark ? 'black' : 'white';
  const isDarkWhite = cardProfileColorIsDark ? 'white' : 'black';
  const isDarkLight = cardProfileColorIsDark ? cardProfileColorLight : cardProfileColorDark;
  const isDarkDark = cardProfileColorIsDark ? cardProfileColorDark : cardProfileColorLight;

  const backgroundImageColor = isDarkLight;
  const backgroundOpacityColor = isDarkLight;
  const buttonColor = isDarkWhite;
  const buttonTextColor = isDarkBlack;
  const textColor = isDarkWhite;

  /** UI LABELS  */
  const CARD_NAME = card?.cardName;
  const STATE_ONE_LABEL = l.stats_label_1;
  const STATE_ONE_VALUE = card?.customersCount;
  const STATE_TWO_LABEL = l.stats_label_2;
  const STATE_TWO_VALUE = card?.transactionCount;
  const STATE_THREE_LABEL = capitalizeLetters(card?.cardUnit);
  const imageSource = getPassImageByTemplateId(card?.templateId, 1);
  const SEND_CARD_LABEL = l.send_card_to_customers;
  let PAYMENT_TITLE = '';
  let PAYMENT_SUBTEXT = '';

  if (!isPaid) {
    PAYMENT_TITLE = l.pay;
    PAYMENT_SUBTEXT = l.to_upgrade_and_use_card;
  } else if (isExpired) {
    PAYMENT_TITLE = l.renew;
    PAYMENT_SUBTEXT = `${l.your_subscription_expires_on} ${expiryDate}.`;
  } else {
    PAYMENT_TITLE = l.purchase;
    PAYMENT_SUBTEXT = l.purchase_card_today;
  }

  /** CALCULATE TOTALS */
  const getTotalMaxValue = getTotalPropertyValue(customers, 'cardId', 'maxValue', cardId);
  const getTotalValue = getTotalPropertyValue(customers, 'cardId', 'value', cardId);
  const STATE_THREE_VALUE = `${getTotalValue} / ${getTotalMaxValue}`;

  const navigateToPayment = () => {
    navigation.navigate('Paywall', { offer: 'giftOffer', cardId: cardId });
  };

  const navigateToSendCard = () => {
    navigation.navigate('CardShareSend', { card: card });
  };

  const TrialStrip = () => {
    return (
      <View style={styles.stripContainer}>
        <View style={[styles.strip, { backgroundColor: buttonColor }]} />
        <Text style={[styles.stripText, { color: cardProfileColor }]}>{l.trial}</Text>
      </View>
    );
  };

  const PaymentButton = () => {
    return (
      <View style={[styles.paymentContainer]}>
        <TouchableOpacity
          onPress={navigateToPayment}
          style={[styles.payment, { backgroundColor: buttonColor }]}
        >
          <View style={{ flexDirection: 'row' }}>
            <MaterialIcons name='payment' size={24} color={buttonTextColor} />
            <Text style={[styles.paymentText, { color: buttonTextColor }]}>{PAYMENT_TITLE}</Text>
          </View>
          <Text style={[{ color: buttonTextColor }]}>{PAYMENT_SUBTEXT}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const SendToCustomerButton = () => {
    return (
      <TouchableOpacity
        onPress={navigateToSendCard}
        style={[
          styles.button,
          {
            backgroundColor: buttonColor,
          },
        ]}
      >
        <Text style={{ color: buttonTextColor, fontWeight: 'bold' }}>{SEND_CARD_LABEL}</Text>
        <Ionicons name='share' size={24} color={buttonTextColor} />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width,
        height: height / 2,
      }}
    >
      <View style={{ overflow: 'hidden', padding: 20 }}>
        <View style={styles.header}>
          {isTrial && <TrialStrip />}
          <View style={styles.logo}>
            <Image style={styles.image} source={{ uri: cardLogo }} />
          </View>
        </View>
        <View style={styles.heroContainer}>
          {SHOW && !isPaid && <PaymentButton />}
          <Image style={styles.heroImage} source={imageSource} />
        </View>
        <SendToCustomerButton />
        <View style={styles.rowContainer}>
          <View style={styles.rowWrap}>
            <Text style={[styles.textTop, { color: getTextColor }]}>{STATE_ONE_VALUE}</Text>
            <Text style={[styles.textBottom, { color: getTextColor }]}>{STATE_ONE_LABEL}</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={[styles.textTop, { color: getTextColor }]}>{STATE_TWO_VALUE}</Text>
            <Text style={[styles.textBottom, { color: getTextColor }]}>{STATE_TWO_LABEL}</Text>
          </View>
          <View style={styles.rowWrap}>
            <Text style={[styles.textTop, { color: getTextColor }]}>{STATE_THREE_VALUE}</Text>
            <Text style={[styles.textBottom, { color: getTextColor }]}>{STATE_THREE_LABEL}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentContainer: {
    alignSelf: 'center',
    width: '100%',
    position: 'absolute',
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payment: {
    alignSelf: 'center',
    backgroundColor: 'red', // Change the color as needed
    // width: 250,
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
  },
  paymentText: {
    marginHorizontal: 20,
    fontSize: 24,
    textAlign: 'center',
    color: 'white', // Change the color as needed
    fontWeight: 'bold',
  },
  stripContainer: {
    top: 0,
    right: 0,
    position: 'absolute',
    width: 200,
    height: 200,
    zIndex: 99,
  },
  strip: {
    position: 'absolute',
    top: 5,
    right: -70,
    backgroundColor: 'red', // Change the color as needed
    width: 200,
    height: 40,
    transform: [{ rotate: '45deg' }],
  },
  stripText: {
    position: 'absolute',
    top: 20,
    right: -10,
    fontSize: 24,
    textAlign: 'center',
    color: 'white', // Change the color as needed
    transform: [{ rotate: '45deg' }],
    fontWeight: 'bold',
  },
  textTop: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textBottom: {
    textAlign: 'center',
    fontSize: 14,
  },

  button: {
    alignSelf: 'center',
    marginVertical: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
    height: 60,
    width: '70%',
    backgroundColor: 'black',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
  },
  container: {
    top: 25,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowRadius: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    flex: 1,
    padding: 10,
    paddingTop: 20,
    marginBottom: -20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rowContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowWrap: {
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginEnd: 5,
  },
  image: {
    resizeMode: 'contain',
    height: 80,
    width: 80,
  },
  heroContainer: {
    marginHorizontal: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    marginVertical: -20,
    width: width,
    resizeMode: 'contain',
  },
  brandText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tagBox: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
