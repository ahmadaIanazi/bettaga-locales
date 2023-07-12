import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Alert, CustomSwitch, Div, L, T, Toast } from '../../../customized';
import { useKeyboard } from '../../hooks/useKeyboard';
import { convertURLsToAttributedValue } from '../../operations/converts';
import { updateCard } from '../../operations/update';
import { useCardStore } from '../../state/useCardStore';
import bttns from '../../themes/buttons';
import txts from '../../themes/texts';
import themeContext from '../../themes/theme';

const { width, height } = Dimensions.get('screen');

export default function CardSettingsDetails() {
  const color = useContext(themeContext);
  const { cardState } = useCardStore();
  const CARD_LOGO = cardState.logo;
  const CARD_NAME = cardState.passJson.logoText;
  const imageSource = require('../../../assets/img/mobile.png');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false)
  const [error, setError] = useState(false)
  const [inputLabel1, setInputLabel1] = useState('');
  const [inputLabel2, setInputLabel2] = useState('');
  const [inputLabel3, setInputLabel3] = useState('');
  const [inputLabel4, setInputLabel4] = useState('');
  const [inputLabel5, setInputLabel5] = useState('');
  const [inputLabel6, setInputLabel6] = useState('');
  const [inputLabel7, setInputLabel7] = useState('');
  const [inputText1, setInputText1] = useState('');
  const [inputText2, setInputText2] = useState('');
  const [inputText3, setInputText3] = useState('');
  const [inputText4, setInputText4] = useState('');
  const [inputText5, setInputText5] = useState('');
  const [inputText6, setInputText6] = useState('');
  const [inputText7, setInputText7] = useState('');
  const [inputDescription, setInputDescription] = useState('')
  const scrollViewRef = useRef(null);
  const BACKFIELD_1_TEXT_REF = useRef(null);
  const BACKFIELD_2_TEXT_REF = useRef(null);
  const BACKFIELD_3_TEXT_REF = useRef(null);
  const BACKFIELD_4_TEXT_REF = useRef(null);
  const BACKFIELD_5_TEXT_REF = useRef(null);
  const BACKFIELD_6_TEXT_REF = useRef(null);
  const BACKFIELD_7_TEXT_REF = useRef(null);
  const BACKFIELD_1_LABEL_REF = useRef(null);
  const BACKFIELD_2_LABEL_REF = useRef(null);
  const BACKFIELD_3_LABEL_REF = useRef(null);
  const BACKFIELD_4_LABEL_REF = useRef(null);
  const BACKFIELD_5_LABEL_REF = useRef(null);
  const BACKFIELD_6_LABEL_REF = useRef(null);
  const BACKFIELD_7_LABEL_REF = useRef(null);
  const BACKFIELD_DESCRIPTION_REF = useRef(null);

  // const BACKFIELD_1_TEXT = cardState?.passJson?.storeCard?.backFields[0]?.value || 'How to?';
  // const BACKFIELD_2_TEXT = cardState?.passJson?.storeCard?.backFields[1]?.value || 'Terms and conditions';
  // const BACKFIELD_3_TEXT = cardState?.passJson?.storeCard?.backFields[2]?.value || 'On our website: www.bettaga.com';
  // const BACKFIELD_4_TEXT = cardState?.passJson?.storeCard?.backFields[3]?.value || '+966558845275';
  // const BACKFIELD_5_TEXT = cardState?.passJson?.storeCard?.backFields[4]?.value || '@bettagah';
  // const BACKFIELD_6_TEXT = cardState?.passJson?.storeCard?.backFields[5]?.value || '@bettagah';
  // const BACKFIELD_7_TEXT = cardState?.passJson?.storeCard?.backFields[6]?.value || '@bettagah';
  // const BACKFIELD_1_LABEL = cardState?.passJson?.storeCard?.backFields[0]?.label || 'How to?';
  // const BACKFIELD_2_LABEL = cardState?.passJson?.storeCard?.backFields[1]?.label || 'Terms and conditions';
  // const BACKFIELD_3_LABEL = cardState?.passJson?.storeCard?.backFields[2]?.label || 'Visit us';
  // const BACKFIELD_4_LABEL = cardState?.passJson?.storeCard?.backFields[3]?.label || 'Contact Us';
  // const BACKFIELD_5_LABEL = cardState?.passJson?.storeCard?.backFields[4]?.label || 'Threads';
  // const BACKFIELD_6_LABEL = cardState?.passJson?.storeCard?.backFields[5]?.label || 'Twitter';
  const BACKFIELD_DESCRIPTION = cardState?.passJson?.description || 'Description';
  const BACKFIELD_1_TEXT =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'howto')?.value ||
    'How to?';
  const BACKFIELD_2_TEXT =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'conditions')?.value ||
    'Terms and conditions';
  const BACKFIELD_3_TEXT =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'website')?.value ||
    'On our website: www.bettaga.com';
  const BACKFIELD_4_TEXT =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'phone')?.value ||
    '+966558845275';
  const BACKFIELD_5_TEXT =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'link1')?.value ||
    '@bettagah';
  const BACKFIELD_6_TEXT =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'link2')?.value ||
    '@bettagah';
  const BACKFIELD_7_TEXT =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'link3')?.value ||
    '@bettagah';
  const BACKFIELD_1_LABEL =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'howto')?.label ||
    'How to?';
  const BACKFIELD_2_LABEL =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'conditions')?.label ||
    'Terms and conditions';
  const BACKFIELD_3_LABEL =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'website')?.label ||
    'Visit us';
  const BACKFIELD_4_LABEL =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'phone')?.label ||
    'Contact Us';
  const BACKFIELD_5_LABEL =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'link1')?.label ||
    'Threads';
  const BACKFIELD_6_LABEL =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'link2')?.label ||
    'Twitter';
  const BACKFIELD_7_LABEL =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'link3')?.label ||
    'Tiktok';
  const BACKFIELD_COPYRIGHT =
    cardState?.passJson?.storeCard?.backFields.find((field) => field.key === 'copyright')?.label ||
    'Powered by Bettaga';



  const keyboardHeight = useKeyboard();
  const keyboardOpen = keyboardHeight > 0;
  const submitButtonText = 'Update Card Details';

  const handleUpdateCardDetails = () => {
    if (!loading) {
      const type = 'details';
      const value = [
        {
          key: 'description',
          value: inputDescription || BACKFIELD_DESCRIPTION,
        },
        {
          key: 'howto',
          label: inputLabel1 || BACKFIELD_1_LABEL,
          value: inputText1 || BACKFIELD_1_TEXT,
        },
        {
          key: 'conditions',
          label: inputLabel2 || BACKFIELD_2_LABEL,
          value: inputText2 || BACKFIELD_2_TEXT,
        },
        {
          key: 'website',
          label: inputLabel3 || BACKFIELD_3_LABEL,
          value: inputText3 || BACKFIELD_3_TEXT,
          attributedValue: convertURLsToAttributedValue(inputText3) || BACKFIELD_3_TEXT,
          dataDetectorTypes: ['PKDataDetectorTypeLink'],
        },
        {
          key: 'phone',
          label: inputLabel4 || BACKFIELD_4_LABEL,
          value: inputText4 || BACKFIELD_4_TEXT,
        },
        {
          key: 'link1',
          label: inputLabel5 || BACKFIELD_5_LABEL,
          value: inputText5 || BACKFIELD_5_TEXT,
          attributedValue: convertURLsToAttributedValue(inputText5) || BACKFIELD_5_TEXT,
          dataDetectorTypes: ['PKDataDetectorTypeLink'],
        },
        {
          key: 'link2',
          label: inputLabel6 || BACKFIELD_6_LABEL,
          value: inputText6 || BACKFIELD_6_TEXT,
          attributedValue: convertURLsToAttributedValue(inputText6) || BACKFIELD_6_TEXT,
          dataDetectorTypes: ['PKDataDetectorTypeLink'],
        },
        {
          key: 'link3',
          label: inputLabel7 || BACKFIELD_7_LABEL,
          value: inputText7 || BACKFIELD_7_TEXT,
          attributedValue: convertURLsToAttributedValue(inputText7) || BACKFIELD_7_TEXT,
          dataDetectorTypes: ['PKDataDetectorTypeLink'],
        },
      ];
      onPressCancel();
      setLoading(true);
      setToast(false);
      setError(false);

      updateCard(cardState, type, value)
        .then(() => {
          setToast(true)
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  };

  const handleOnPressTransaction = (a) => {
    let inputRef;

    switch (a) {
      case 1:
        inputRef = BACKFIELD_1_TEXT_REF;
        break;
      case 2:
        inputRef = BACKFIELD_2_TEXT_REF;
        break;
      case 3:
        inputRef = BACKFIELD_3_TEXT_REF;
        break;
      case 4:
        inputRef = BACKFIELD_4_TEXT_REF;
        break;
      case 5:
        inputRef = BACKFIELD_5_TEXT_REF;
        break;
      case 6:
        inputRef = BACKFIELD_6_TEXT_REF;
        break;
      case 7:
        inputRef = BACKFIELD_7_TEXT_REF;
        break;
      case 8:
        inputRef = BACKFIELD_DESCRIPTION_REF;
        break;
      default:
        break;
    }

    if (inputRef && inputRef.current) {
      inputRef.current.focus();

      inputRef.current.measure((x, y, width, height) => {
        if (Platform.OS === 'ios') {
          console.log('y:', height, y);
          scrollViewRef.current.scrollTo({ y: y + height - keyboardHeight });
        } else {
          scrollViewRef.current.scrollTo({ y: y });
        }
      });
    }
  };
  const [Warning, setWarning] = useState(false);

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
        <View style={styles.backfieldWrap}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            style={styles.backfieldScrollview}
          >
            <KeyboardAvoidingView>
              <View style={{ height: 100 }} />
              {!keyboardOpen && (
                <T s='center mb-10' color={color.text}>
                  Tap to change card details
                </T>
              )}
              <L color={color.text}>Description</L>
              <Div s='mb-20 c br-20' color={color.light}>
                <TouchableOpacity
                  key={8}
                  onPress={() => handleOnPressTransaction(8)}
                  style={styles.backfield}
                >
                  <TextInput
                    ref={BACKFIELD_DESCRIPTION_REF}
                    onChangeText={setInputDescription}
                    placeholderTextColor={color.text}
                    placeholder={BACKFIELD_DESCRIPTION}
                    style={{ textAlign: 'center', color: color.text }}
                  />
                </TouchableOpacity>
              </Div>

              <View style={styles.backfieldBox}>
                <TouchableOpacity
                  key={1}
                  onPress={() => handleOnPressTransaction(1)}
                  style={styles.backfield}
                >
                  <TextInput
                    ref={BACKFIELD_1_LABEL_REF}
                    onChangeText={setInputLabel1}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_1_LABEL}
                    style={{ fontWeight: 'bold' }}
                  />
                  <TextInput
                    ref={BACKFIELD_1_TEXT_REF}
                    onChangeText={setInputText1}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_1_TEXT}
                    multiline={true}
                  />
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  key={2}
                  onPress={() => handleOnPressTransaction(2)}
                  style={styles.backfield}
                >
                  <TextInput
                    ref={BACKFIELD_2_LABEL_REF}
                    onChangeText={setInputLabel2}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_2_LABEL}
                    style={{ fontWeight: 'bold' }}
                  />
                  <TextInput
                    ref={BACKFIELD_2_TEXT_REF}
                    onChangeText={setInputText2}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_2_TEXT}
                    multiline={true}
                  />
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  key={3}
                  onPress={() => handleOnPressTransaction(3)}
                  style={styles.backfield}
                >
                  <TextInput
                    ref={BACKFIELD_3_LABEL_REF}
                    onChangeText={setInputLabel3}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_3_LABEL}
                    style={{ fontWeight: 'bold' }}
                  />
                  <TextInput
                    ref={BACKFIELD_3_TEXT_REF}
                    onChangeText={setInputText3}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_3_TEXT}
                    multiline={true}
                  />
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  key={4}
                  onPress={() => handleOnPressTransaction(4)}
                  style={styles.backfield}
                >
                  <TextInput
                    ref={BACKFIELD_4_LABEL_REF}
                    onChangeText={setInputLabel4}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_4_LABEL}
                    style={{ fontWeight: 'bold' }}
                    multiline={true}
                  />
                  <TextInput
                    ref={BACKFIELD_4_TEXT_REF}
                    onChangeText={setInputText4}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_4_TEXT}
                    multiline={true}
                  />
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  key={5}
                  onPress={() => handleOnPressTransaction(5)}
                  style={styles.backfield}
                >
                  <TextInput
                    ref={BACKFIELD_5_LABEL_REF}
                    onChangeText={setInputLabel5}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_5_LABEL}
                    style={{ fontWeight: 'bold' }}
                  />
                  <TextInput
                    ref={BACKFIELD_5_TEXT_REF}
                    onChangeText={setInputText5}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_5_TEXT}
                    multiline={true}
                  />
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  key={6}
                  onPress={() => handleOnPressTransaction(6)}
                  style={styles.backfield}
                >
                  <TextInput
                    ref={BACKFIELD_6_LABEL_REF}
                    onChangeText={setInputLabel6}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_6_LABEL}
                    style={{ fontWeight: 'bold' }}
                  />
                  <TextInput
                    ref={BACKFIELD_6_TEXT_REF}
                    onChangeText={setInputText6}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_6_TEXT}
                    multiline={true}
                  />
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  key={7}
                  onPress={() => handleOnPressTransaction(7)}
                  style={styles.backfield}
                >
                  <TextInput
                    ref={BACKFIELD_7_LABEL_REF}
                    onChangeText={setInputLabel7}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_7_LABEL}
                    style={{ fontWeight: 'bold' }}
                  />
                  <TextInput
                    ref={BACKFIELD_7_TEXT_REF}
                    onChangeText={setInputText7}
                    placeholderTextColor={'black'}
                    placeholder={BACKFIELD_7_TEXT}
                    multiline={true}
                  />
                </TouchableOpacity>
              </View>
              <Div s='mb-20 jb ac p-10 br-20 row' color={color.light}>
                <T color={color.placeholder}>Show:</T>
                <T>{BACKFIELD_COPYRIGHT}</T>
                <CustomSwitch value={true} color={color.light} />
              </Div>
              <View style={{ height: 400 }} />
            </KeyboardAvoidingView>
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
          <ActivityIndicator size={'large'} color={color.text} />
        ): (<>
            <Text style={txts.action}>{submitButtonText}</Text>
            <FontAwesome style={styles.bttnIcon} name='refresh' size={24} color='white' />
        </>)}
          </TouchableOpacity>
      </View>
      {Warning && (
        <Alert
          onPressCancel={onPressCancel}
          onPressOk={handleUpdateCardDetails}
          title='Are you sure?'
          message='This cannot be un-done ! No backsies !!'
        />
      )}
      <Toast
        message='Dont forget to update the old cards from the settings.'
        type='success'
        trigger={toast}
      />
      <Toast
        message='Oops something went wrong try again later.'
        type='error'
        trigger={error}
      />
    </>
  );
}

const styles = StyleSheet.create({
  divider: { height: 1, width: '100%', backgroundColor: 'grey' },
  backfieldWrap: {
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
  backfieldBox: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    marginBottom: 20,
  },
  backfield: {
    zIndex: 999,
    padding: 10,
    width: '100%',
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
