import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../utils/formatDate';
import { hexOrRgbToLightest } from '../../utils/hexOrRgbToLightest';
import { getOnlyNumber } from '../../utils/getOnlyNumber';
import { capitalizeLetters } from '../../utils/capitalizeLetters';
import { Div, H, P } from '../../../customized';
import themeContext from '../../themes/theme';

export default function Transaction({ transaction }) {
  const color = useContext(themeContext)
  const { name, date, maxValue, unit, newLevel, newValue, oldLevel, oldValue } = transaction;

  const transactionColor = transaction?.newPassJson?.backgroundColor;
  const isAddition = newValue > oldValue;
  const isCloseToMaxValue = Math.abs(newValue) >= maxValue * 0.8;

  const transactionType = isAddition ? 'Addition' : 'Subtraction';
  const arrowIcon = isAddition ? '+' : '-';
  const arrowColor = isAddition ? color.success : color.error; ;
  const colorScale = isCloseToMaxValue ? color.warning : color.success ;

  const formattedDate = formatDate(date);
  const formattedValue = `${newValue} ${unit}`;

  const navigateToPass = () => {
    const passes = [transaction];
    // navigation.navigate('ModalScanned', { passes });
  };

  return (
    <TouchableOpacity onPress={navigateToPass}>
      <Div s='ac jb mv-10 br-20 mh-10 ph-20 pv-10 row' color={color.light}>
        <View style={styles.iconContainer}>
          <View style={[styles.icon, { backgroundColor: transactionColor }]} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={[styles.name, { color: color.text }]}>{name}</Text>
          <Text style={[styles.date, { color: color.placeholder }]}>{formattedDate}</Text>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.level}>{`${oldValue} -> ${newValue} ${unit}`}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={[styles.arrow, { color: arrowColor }]}>{arrowIcon}</Text>
        </View>
      </Div>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: '#888',
  },
  arrowContainer: {
    marginStart: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  levelContainer: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  level: {
    fontSize: 12,
    color: '#888',
  },
});

/**
 * TRANSACTION: Object {
  "cardId": "Nysr2uCAapLyWz11KNKH",
  "date": Object {
    "nanoseconds": 508000000,
    "seconds": 1687259411,
  },
  "id": "ec3bUpgTViyg5JVhwYgY",
  "levels": 7,
  "maxValue": 6,
  "merchantId": "YfWYeBLq8LdSFT4mLVYJYJd0bwi1",
  "name": "Glamore Customer",
  "newLevel": 2,
  "newPassJson": Object {
    "authenticationToken": "nU1djUJfv2WOTG61QQsHCEAgexyA39iK",
    "backgroundColor": "rgb(255, 228, 225)",
    "barcode": Object {
      "altText": "",
      "format": "PKBarcodeFormatCode128",
      "message": "+966565969555",
      "messageEncoding": "iso-8859-1",
    },
    "description": "No back",
    "expirationDate": "2024-06-19T10:55:07.800Z",
    "foregroundColor": "rgb(0, 0, 0)",
    "formatVersion": 1,
    "labelColor": "rgb(155, 128, 125)",
    "locations": Array [
      Object {
        "altitude": 100,
        "latitude": 24.774265,
        "longitude": 46.738586,
        "relevantText": "The store is nearby !",
      },
    ],
    "logoText": "No back",
    "organizationName": "No back",
    "passTypeIdentifier": "pass.bettaga.wecode.www",
    "relevantDate": "2024-06-19T10:55:07.800Z",
    "serialNumber": "GwZjWfOqKvG2sG7la3de",
    "sharingProhibited": true,
    "storeCard": Object {
      "backFields": Array [
        Object {
          "changeMessage": "%@",
          "key": "notification",
          "label": "Lates Notifications",
          "value": "",
        },
        Object {
          "attributedValue": "Powered By: <a href=’http://www.bettaga.com’>Bettaga.com</a>",
          "dataDetectorTypes": Array [
            "PKDataDetectorTypeLink",
          ],
          "key": "copyright",
          "label": "",
          "value": "Powered By Bettaga App تطبيق بطاقة",
        },
      ],
      "headerFields": Array [
        Object {
          "changeMessage": "Your got a new stamp: %@",
          "key": "header",
          "label": "STAMPS",
          "value": "1/6",
        },
      ],
      "primaryFields": Array [
        Object {
          "key": "primary",
          "label": "",
          "value": "",
        },
        Object {
          "key": "primary1",
          "label": "",
          "value": "",
        },
      ],
      "secondaryFields": Array [
        Object {
          "key": "name",
          "label": "CUSTOMER NAME",
          "value": "Glamore Customer",
        },
        Object {
          "key": "expiry",
          "label": "EXPIRY",
          "value": "2024-06-19",
        },
      ],
    },
    "suppressStripShine": false,
    "teamIdentifier": "PV3M586KN2",
    "webServiceURL": "https://us-central1-bettagah-570df.cloudfunctions.net/app/",
  },
  "newValue": 1,
  "oldLevel": 1,
  "oldPassJson": Object {
    "authenticationToken": "nU1djUJfv2WOTG61QQsHCEAgexyA39iK",
    "backgroundColor": "rgb(255, 228, 225)",
    "barcode": Object {
      "altText": "",
      "format": "PKBarcodeFormatCode128",
      "message": "+966565969555",
      "messageEncoding": "iso-8859-1",
    },
    "description": "No back",
    "expirationDate": "2024-06-19T10:55:07.800Z",
    "foregroundColor": "rgb(0, 0, 0)",
    "formatVersion": 1,
    "labelColor": "rgb(155, 128, 125)",
    "locations": Array [
      Object {
        "altitude": 100,
        "latitude": 24.774265,
        "longitude": 46.738586,
        "relevantText": "The store is nearby !",
      },
    ],
    "logoText": "No back",
    "organizationName": "No back",
    "passTypeIdentifier": "pass.bettaga.wecode.www",
    "relevantDate": "2024-06-19T10:55:07.800Z",
    "serialNumber": "GwZjWfOqKvG2sG7la3de",
    "sharingProhibited": true,
    "storeCard": Object {
      "backFields": Array [
        Object {
          "changeMessage": "%@",
          "key": "notification",
          "label": "Lates Notifications",
          "value": "",
        },
        Object {
          "attributedValue": "Powered By: <a href=’http://www.bettaga.com’>Bettaga.com</a>",
          "dataDetectorTypes": Array [
            "PKDataDetectorTypeLink",
          ],
          "key": "copyright",
          "label": "",
          "value": "Powered By Bettaga App تطبيق بطاقة",
        },
      ],
      "headerFields": Array [
        Object {
          "changeMessage": "Your got a new stamp: %@",
          "key": "header",
          "label": "STAMPS",
          "value": "1/6",
        },
      ],
      "primaryFields": Array [
        Object {
          "key": "primary",
          "label": "",
          "value": "",
        },
        Object {
          "key": "primary1",
          "label": "",
          "value": "",
        },
      ],
      "secondaryFields": Array [
        Object {
          "key": "name",
          "label": "CUSTOMER NAME",
          "value": "Glamore Customer",
        },
        Object {
          "key": "expiry",
          "label": "EXPIRY",
          "value": "2024-06-19",
        },
      ],
    },
    "suppressStripShine": false,
    "teamIdentifier": "PV3M586KN2",
    "webServiceURL": "https://us-central1-bettagah-570df.cloudfunctions.net/app/",
  },
  "oldUpdateDate": Object {
    "nanoseconds": 900000000,
    "seconds": 1687259157,
  },
  "oldValue": 0,
  "passId": "GwZjWfOqKvG2sG7la3de",
  "passType": "stamps-a5",
  "phone": "565969555",
  "serialNumber": "GwZjWfOqKvG2sG7la3de",
  "unit": "Color",
}
 */
