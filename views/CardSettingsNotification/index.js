import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useRef, useState } from 'react';
import bttns from '../../themes/buttons';
import txts from '../../themes/texts';
import { LinearGradient } from 'expo-linear-gradient';
import { useCardStore } from '../../state/useCardStore';
import { replaceSymbolWithString } from '../../utils/replaceSymbolWithString';
import { useKeyboard } from '../../hooks/useKeyboard';
import { Alert } from '../../../customized';
import themeContext from '../../themes/theme';
import { updateCard } from '../../operations/update';
import { updateDocField } from '../../data/update/updateDocField';

const { width, height } = Dimensions.get('screen');

export default function CardSettingsNotification() {
  const color = useContext(themeContext)
  const { cardState } = useCardStore();
  const cardId = cardState?.id
  const submitButtonText = 'Update Settings';
  const imageSource = require('../../../assets/img/mobile.png');
  const [transactionInput, setTransactionInput] = useState('')
  const [rewardInput, setRewardInput] = useState('')
  const [completedInput, setCompletedInput] = useState('')
  const [expiredInput, setExpiredInput] = useState('')
  const [voidedInput, setVoidedInput] = useState('')
  const [locationInput, setLocationInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [Warning, setWarning] = useState(false);

  const NotificationRef = useRef(null);
  const CompletedRef = useRef(null);
  const ExpiredRef = useRef(null);
  const VoidedRef =  useRef(null)
  const scrollViewRef = useRef(null);
  const LocationRef = useRef(null);

  const CARD_LOGO = cardState.logo;
  const CARD_NAME = cardState.passJson.logoText  || ''
  const TRANSACTION_NOTIFICATION = cardState.passJson.storeCard.headerFields[0].changeMessage || '';
  const REWARD_VALUE = cardState.passJson.storeCard.headerFields[0].value || '';
  const LOCATION_VALUE = cardState.passJson.locations[0].relevantText || '';
  const NOTIFICATION = replaceSymbolWithString(TRANSACTION_NOTIFICATION, REWARD_VALUE);

  const placeholder_passCompletedMessage = cardState?.passCompletedMessage || ''
  const placeholder_passExpiredMessage = cardState?.passExpiredMessage || '';
  const placeholder_passVoidedMessage = cardState?.passVoidedMessage || '';
  const keyboardHeight = useKeyboard()
  const keyboardOpen = keyboardHeight > 0

  const handleUpdateNotificationSettings = () => {
    if (!loading) {
      const type = 'notificationSettings';
      let transaction = '';
      if (transactionInput) {
        transaction = transactionInput + '%@';
      } else {
        transaction = TRANSACTION_NOTIFICATION; // Use placeholder value
      }
      const value = {
        transaction: transaction,
        location: locationInput || LOCATION_VALUE, // Use placeholder value if locationInput is empty
        expired: expiredInput || placeholder_passExpiredMessage,
        voided: voidedInput || placeholder_passVoidedMessage,
        completed: completedInput || placeholder_passCompletedMessage,
      };
      onPressCancel();
      setLoading(true);

      updateCard(cardState, type, value)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });

      if(rewardInput){
        updateDocField('cards', cardId, 'passCompletedMessage', rewardInput);
      }
    }
  };

    const handleOnPressRef = (a) => {
      let inputRef;

      switch (a) {
        case 1:
          inputRef = NotificationRef;
          break;
        case 2:
          inputRef = CompletedRef;
          break;
        case 3:
          inputRef = ExpiredRef;
          break;
        case 4:
          inputRef = VoidedRef;
          break;
        case 5:
          inputRef = LocationRef;
          break;
        default:
          break;
      }

      if (inputRef && inputRef.current) {
        inputRef.current.focus();

      }
    };


    const handleWarning = () => {
      setWarning(true);
    };

    const onPressCancel = () => {
      setWarning(false);
    };


  const linearUp = [color.background, color.transparent];

  return (
    <>
      <View style={{ flex: 1, backgroundColor: color.background, alignItems: 'center' }}>
        <LinearGradient colors={linearUp} style={styles.linearUp} />
        <View style={[styles.notificationContainer]}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            style={styles.backfieldScrollview}
          >
            <View style={{ height: 100 }} />
            {!keyboardOpen && <Text style={{ marginBottom: 20 }}>Tap to change text</Text>}
            <Text style={{ color: color.text }}>Transactions notification</Text>
            <TouchableOpacity onPress={() => handleOnPressRef(1)} style={styles.notification}>
              <View style={styles.notificationLogoBox}>
                <Image source={{ uri: CARD_LOGO }} style={styles.notificationLogo} />
              </View>
              <View style={{ maxWidth: '80%' }}>
                <Text style={{ fontWeight: 'bold' }}>{CARD_NAME}</Text>
                <TextInput
                  ref={NotificationRef}
                  onChangeText={setTransactionInput}
                  placeholderTextColor={'black'}
                  placeholder={NOTIFICATION}
                  maxLength={160}
                />
              </View>
            </TouchableOpacity>
            <Text style={{ color: color.text }}>Completion message</Text>
            <TouchableOpacity onPress={() => handleOnPressRef(2)} style={styles.notification}>
              <View style={styles.notificationLogoBox}>
                <Image source={{ uri: CARD_LOGO }} style={styles.notificationLogo} />
              </View>
              <View style={{ maxWidth: '80%' }}>
                <Text style={{ fontWeight: 'bold' }}>{CARD_NAME}</Text>
                <TextInput
                  ref={CompletedRef}
                  onChangeText={setCompletedInput}
                  placeholderTextColor={'black'}
                  placeholder={placeholder_passCompletedMessage}
                  maxLength={160}
                />
              </View>
            </TouchableOpacity>
            <Text style={{ color: color.text }}>Expired message</Text>
            <TouchableOpacity onPress={() => handleOnPressRef(3)} style={styles.notification}>
              <View style={styles.notificationLogoBox}>
                <Image source={{ uri: CARD_LOGO }} style={styles.notificationLogo} />
              </View>
              <View style={{ maxWidth: '80%' }}>
                <Text style={{ fontWeight: 'bold' }}>{CARD_NAME}</Text>
                <TextInput
                  ref={ExpiredRef}
                  onChangeText={setExpiredInput}
                  placeholderTextColor={'black'}
                  placeholder={placeholder_passExpiredMessage}
                  maxLength={160}
                />
              </View>
            </TouchableOpacity>
            <Text style={{ color: color.text }}>Voided Message</Text>
            <TouchableOpacity onPress={() => handleOnPressRef(4)} style={styles.notification}>
              <View style={styles.notificationLogoBox}>
                <Image source={{ uri: CARD_LOGO }} style={styles.notificationLogo} />
              </View>
              <View style={{ maxWidth: '80%' }}>
                <Text style={{ fontWeight: 'bold' }}>{CARD_NAME}</Text>
                <TextInput
                  ref={VoidedRef}
                  onChangeText={setRewardInput}
                  placeholderTextColor={'black'}
                  placeholder={placeholder_passVoidedMessage}
                  maxLength={160}
                />
              </View>
            </TouchableOpacity>
            <Text style={{ color: 'grey' }}>Customer within 150 meters of location</Text>
            <TouchableOpacity onPress={() => handleOnPressRef(5)} style={styles.notification}>
              <View style={styles.notificationLogoBox}>
                <Image source={{ uri: CARD_LOGO }} style={styles.notificationLogo} />
              </View>
              <View style={{ maxWidth: '80%' }}>
                <Text style={{ fontWeight: 'bold' }}>{CARD_NAME}</Text>
                <TextInput
                  ref={LocationRef}
                  onChangeText={setLocationInput}
                  placeholderTextColor={'black'}
                  placeholder={LOCATION_VALUE}
                  maxLength={160}
                />
              </View>
            </TouchableOpacity>
            <View style={{ height: 400 }} />
          </ScrollView>
        </View>
        <View style={styles.imageContainer}>
          <Image
            onError={() => <ActivityIndicator size='large' color='black' />}
            onProgress={() => <ActivityIndicator size='large' color='black' />}
            onLoad={() => <ActivityIndicator size='large' color='black' />}
            onLayout={() => <ActivityIndicator size='large' color='black' />}
            source={imageSource}
            style={styles.image}
          />
          <View style={styles.dropshadow} />
        </View>

        <TouchableOpacity
          onPress={handleWarning}
          style={[bttns.dynamic, styles.bttns, { backgroundColor: color.primary }]}
        >
          {loading ? (
            <ActivityIndicator size='large' color={color.text} />
          ) : (
            <>
              <Text style={txts.action}>{submitButtonText}</Text>
              <FontAwesome style={styles.bttnIcon} name='refresh' size={24} color='white' />
            </>
          )}
        </TouchableOpacity>
      </View>
      {Warning && (
        <Alert
          onPressCancel={onPressCancel}
          onPressOk={handleUpdateNotificationSettings}
          title='Are you sure?'
          message='This cannot be un-done ! No backsies !!'
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    position: 'absolute',
    width: '80%',
    height: '72%',
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backfieldScrollview: {
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  notification: {
    zIndex: 999,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
  },
  notificationLogoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    width: 40,
    marginEnd: 20,
    backgroundColor: 'black',
  },
  notificationLogo: {
    height: 40,
    width: 40,
  },
  linearUp: {
    zIndex: 100,
    top: 0,
    position: 'absolute',
    height: 100,
    width: '100%',
  },
  bttns: {
    zIndex: 100,
    marginHorizontal: 30,
    marginVertical: 20,
    flexDirection: 'row',
    bottom: 60,
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
  },
  bttnIcon: {
    marginHorizontal: 10,
  },
  imageContainer: {
    zIndex: -1,
    top: -200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width,
    height: height,
  },
  image: {
    zIndex: -1,
    resizeMode: 'contain',
    zIndex: 10,
    height: 740,
  },
  dropshadow: {
    width: 250,
    height: 8,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,

    backgroundColor: 'black',
    alignSelf: 'center',
    top: -10,
    zIndex: -1,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
  },
});
