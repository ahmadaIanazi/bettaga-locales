import { StyleSheet, Text, View, Switch, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import QRCode from 'react-native-qrcode-svg';
import Section from '../../widgets/section';
import StatSmall from '../../components/statSmall';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../state/useUserStore';
import Header from '../../widgets/header';
import themeContext from '../../themes/theme';
import { Ionicons } from '@expo/vector-icons';
import Pass from '../../components/pass';
import { useNavigation } from '@react-navigation/native';
import { ENROLL_URL } from '../../K/urls';
import { addPrivate } from '../../data/add/addPrivate';
import { shareURL } from '../../features/shareURL';
import { toNameFromTemplateId } from '../../operations/to';
import * as WebBrowser from 'expo-web-browser';
import { copyToClipboard } from '../../features/clipboard';
import { Button, Tap } from '../../../customized';


const PERIODS = [
  { id: 1, period: 'week', label: 'Week' },
  { id: 2, period: 'month', label: 'Month' },
  { id: 3, period: 'year', label: 'Year' },
];

export default function ModalCreateLink({
  route: {
    params: { card },
  },
}) {
  const color = useContext(themeContext);
  const [period, serPeriod] = useState(PERIODS[2].period);
  const navigation = useNavigation();
  const [copied, setCopied] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [input, setInput] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [urlReady, setUrlReady] = useState(false)
  const [smsReady, setSmsReady] = useState(false)
  const [passcodeCopied, setPasscodeCopied] = useState(false)
  const [URL, setURL] = useState(null)
  const cardName = card?.cardName
  const sharingMessage = `You have received a card from ${cardName}, use this passcode to unlock: ${passcode}, Get your card now, and don't share the link !`;

  const cardId = card?.id;
  const cardUnit = card?.cardUnit;
  const headerValue = card?.passJson?.storeCard?.headerFields[0]?.label;
  const placeholder = card?.passJson?.storeCard?.headerFields[0]?.value;

  const cardTemplateName = toNameFromTemplateId(card.templateId);

  const handleCreate = () => {

    setIsCreating(true)
    if(input != null && passcode?.length == 6){
      addPrivate(cardId, period, input, passcode).then((docRef) => {
        setIsCreating(false);
        const URL = `${ENROLL_URL}${cardId}/${docRef}`;
        setURL(URL);
        setUrlReady(true);
      });
      } else {
        setIsCreating(false)
      }
  };

  const handleGenerate = () => {
    const random = Math.floor(Math.random() * 900000) + 100000;
    setPasscode(String(random))
  }

  const handleSharingFile = () => {
    shareURL(URL, sharingMessage);
  }

  const visitURL = () => {
    WebBrowser.openBrowserAsync(URL);
  };

  const copyURL = () => {
    const clip = `${sharingMessage} ${URL}`;
    copyToClipboard(clip)
      .then((result) => {
        setCopied(true);
        console.log(result); // Success message
      })
      .catch((error) => {
        setCopied(false);
        console.log(error); // Error message
      });
  };

  const copyCode = () => {

    copyToClipboard(passcode)
      .then((result) => {
        setPasscodeCopied(true);
        console.log(result); // Success message
      })
      .catch((error) => {
        setPasscodeCopied(false);
        console.log(error); // Error message
      });
  };


  return (
    <View style={{ flex: 1 }}>
      <Header back={true} />
      {urlReady ? (
        <View style={styles.card}>
          <View style={styles.footer}>
            <Text style={{ marginBottom: 20, fontWeight: 'bold', fontSize: 20 }}>Scan QR code</Text>
            <QRCode size={200} value={URL} />
            <TouchableOpacity
              onPress={handleSharingFile}
              style={[styles.buttonsWrap, { marginTop: 30 }]}
            >
              <View style={[styles.button, { backgroundColor: color.action }]}>
                <Text style={{ color: 'white', marginEnd: 10, fontSize: 22 }}>Share Now !</Text>
                <Ionicons name='share' size={24} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>CREATE NEW PASS</Text>
          </View>
          <Text>One time link only for one customer.</Text>
          <View style={styles.footer}>
            <Text style={{ marginBottom: 20, fontWeight: 'bold', fontSize: 20 }}>
              {cardTemplateName}
            </Text>
          </View>
          <View>
            <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
              <View>
                <Text>Protect the pass</Text>
                <Text>Assign a passcode and give it to the customer.</Text>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
              >
                <Text>Passcode: </Text>
                <TextInput
                  onChangeText={setPasscode}
                  value={passcode}
                  style={styles.textInput}
                  keyboardType='number-pad'
                  maxLength={6}
                />
                <Tap style={false} onPress={handleGenerate}>
                  <Text style={{ fontWeight: 'bold' }}>Generate</Text>
                </Tap>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Text>{headerValue}: </Text>
              <TextInput
                onChangeText={setInput}
                value={input}
                placeholder={placeholder}
                style={styles.textInput}
                keyboardType='number-pad'
                maxLength={14}
              />
              <Text>{cardUnit}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Text>Expiration: </Text>
            {PERIODS.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleChooseRole(item.period)}
                style={[
                  styles.roleView,
                  {
                    borderColor: color.action,
                    backgroundColor: period === item.period ? color.action : 'transparent',
                  },
                ]}
              >
                <Text style={{ fontWeight: 'bold' }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        {urlReady ? (
          <>
            <TouchableOpacity onPress={copyURL} style={styles.buttonsWrap}>
              <View style={[styles.miniButton, { backgroundColor: color.secondary }]}>
                <Ionicons name={copied ? 'checkmark' : 'copy'} size={24} color='white' />
              </View>
              <Text>{copied ? 'Done' : 'Copy'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={visitURL} style={styles.buttonsWrap}>
              <View style={[styles.miniButton, { backgroundColor: color.secondary }]}>
                <Ionicons name='link' size={24} color='white' />
              </View>
              <Text>Visit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={copyCode} style={styles.buttonsWrap}>
              <View style={[styles.miniButton, { backgroundColor: color.accent }]}>
                <Ionicons name={passcodeCopied ? 'checkmark' : 'copy'} size={24} color='white' />
              </View>
              <Text>{passcodeCopied ? 'Done' : 'Copy Passcode'}</Text>
            </TouchableOpacity>
          </>
        ) : isCreating ? (
          <ActivityIndicator size='large' color='white' />
        ) : (
          <TouchableOpacity onPress={handleCreate} style={styles.buttonsWrap}>
            <View style={[styles.button, { backgroundColor: color.action }]}>
              <Text style={{ color: 'white', marginEnd: 10, fontSize: 22 }}>
                Create and Share Card
              </Text>
              <Ionicons name='ios-send' size={24} color='white' />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingBottom: 30,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
  },
  textInput: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '60%',
    backgroundColor: 'lightgrey',
    marginEnd: 10,
  },
  outlineButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 20,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    marginVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingEnd: 10,
  },
  status: {
    flexDirection: 'row',
  },
  statusIcon: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: 'grey',
    marginEnd: 5,
  },
  button: {
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  miniButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonsContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonsWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleView: {
    borderWidth: 2,
    zIndex: 100,
    padding: 15,
    paddingHorizontal: 18,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
