import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useContext, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ENROLL_URL } from '../../K/urls';
import { copyToClipboard } from '../../features/clipboard';
import { shareURL } from '../../features/shareURL';
import themeContext from '../../themes/theme';
import Header from '../../widgets/header';

export default function ScreenQRcode({
  route: {
    params: { value, expired, expiry, name, id, cardId, unit, used, generatedLink },
  },
}) {
  const [copied, setCopied] = useState(false)
  const URL = `${ENROLL_URL}${cardId}/${id}`;
  const sharingMessage = 'Share File';

  const color = useContext(themeContext);

  const handleSharingFile = () => {
    shareURL(URL, sharingMessage);
  };

  const visitURL = () => {
    WebBrowser.openBrowserAsync(URL);
  };

  const copyURL = () => {
    const clip = `${sharingMessage} ${URL}`
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


  return (
    <View style={{ backgroundColor: 'rgba(255,255,255,0.9)', flex: 1 }}>
      <Header back={true} />
      <View style={styles.card}>
        <View style={styles.status}>
          <View style={[styles.statusIcon, { backgroundColor: used ? color.action : 'lightgreen' }]} />
          <Text>{used ? 'Used' : ''}</Text>
        </View>
        <View style={styles.header}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            {value} {unit}
          </Text>
          {used ? null : (
            <Switch value={true} style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }} />
          )}
        </View>
        <Text>{name}</Text>
        <View style={styles.footer}>
          <Text style={{ marginBottom: 20, fontWeight: 'bold', fontSize: 20 }}>Scan QR code</Text>
          <QRCode size={200} value={generatedLink} />
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
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={copyURL} style={styles.buttonsWrap}>
            <View style={[styles.miniButton, { backgroundColor: color.secondary }]}>
              <Ionicons name={copied ? 'checkmark' :'copy'} size={24} color='white' />
            </View>
            <Text>{copied ? 'Done' : 'Copy'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={visitURL} style={styles.buttonsWrap}>
            <View style={[styles.miniButton, { backgroundColor: color.secondary }]}>
              <Ionicons name='link' size={24} color='white' />
            </View>
            <Text>Visit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    height: '60%',
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 10,
    // elevation: 5,
    // shadowColor: '#000000',
    // shadowOpacity: 0.4,
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowRadius: 10,
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
  statusIcon: { height: 16, width: 16, borderRadius: 8, backgroundColor: 'grey', marginEnd: 5 },
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonsWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
