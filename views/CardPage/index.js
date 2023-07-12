import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardContainer from '../../components/cardContainer';
import Push from '../../components/push';
import PushLatest from '../../components/pushLatest/pushLatest';
import { SendMessageToAllPasses } from '../../operations/SendMessageToAllPasses';
import { useCardStore } from '../../state/useCardStore';
import { useUserStore } from '../../state/useUserStore';
import txts from '../../themes/texts';
import themeContext from '../../themes/theme';

export default function ScreenCardPage({
  route: {
    params: { card },
  },
}) {
  /** ROLE LOGIC HERE */
  const role = useUserStore((state) => state.user.role);
  const isAnonymous = useUserStore((state) => state.user.isAnonymous);
  const color = useContext(themeContext)

  const SHOW = isAnonymous ? true : role == 'merchant';

  const [isPushAvailable, setIsPushAvailable] = useState(true);
  const {
    cardState,
    introducing,
    askForPayment,
    cardProfileColor,
    cardProfileColorIsDark,
    cardProfileColorLight,
    cardProfileColorDark,
  } = useCardStore();

  const navigation = useNavigation();
  const [seeAllPush, setSeeAllPush] = useState(false);

  useEffect(() => {
    if (card.isSendingPushNotification) {
      console.log('CARD WHAT?', card.isSendingPushNotification);
      setIsPushAvailable(false);
    }
  }, [card]);

  const handlePushNotification = (pushNotificationValue) => {
    const cardId = card.id;
    setIsPushAvailable(false);
    SendMessageToAllPasses(cardId, pushNotificationValue).then(() => {
      setIsPushAvailable(true);
    });
 
  };

  const cardId = cardState.id;
  const isPaid = cardState.paid;
  const isExpired = cardState.expired;

  const See_All_label = seeAllPush ? 'back' : 'See all';

  if (!isPaid || !isExpired) {
    if (!introducing){
      if(askForPayment){
        navigation.navigate('Paywall', { offer: 'giftOffer', cardId: cardId });
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: color.background }}>
      <View style={[styles.main, { backgroundColor: cardProfileColor }]}>
        <CardContainer card={card} />
        {SHOW && (
          <View
            style={[
              styles.pushContainer,
              {
                height: seeAllPush ? '95%' : null,
                backgroundColor: cardProfileColorIsDark
                  ? cardProfileColorLight
                  : cardProfileColorDark,
              },
            ]}
          >
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginHorizontal: 20,
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name='notifications' size={24} color='white' />
                <Text style={[txts.section, { color: 'white', marginStart: 5 }]}>
                  Push Notification
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  setSeeAllPush(!seeAllPush);
                }}
              >
                <Text style={{ fontSize: 14, color: 'white', opacity: 0.5 }}>{See_All_label}</Text>
              </TouchableOpacity>
            </View>
            <PushLatest seeAllPush={seeAllPush} card={card} />
            {isPushAvailable ? (
              <Push
                setSeeAllPush={setSeeAllPush}
                handlePushNotification={handlePushNotification}
                card={card}
              />
            ) : (
              <ActivityIndicator size='large' color={'white'} />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowRadius: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    flex: 1,
  },
  pushContainer: {
    position: 'absolute',
    paddingVertical: 10,
    paddingBottom: 30,
    bottom: 0,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowRadius: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  bttns: {
    marginStart: 30,
    flexDirection: 'row',
  },
  bttnIcon: {
    marginHorizontal: 10,
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconView: {
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
    height: 40,
    width: 40,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
